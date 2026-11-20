import { prisma } from "../../../common/configs/prismaClient.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { MAX_ROWS } from "../../../common/utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../../../common/utils/user.utils.js";
import { dateOnlyText, toDateOnly } from "../../../common/utils/term.utils.js";
import { decimal, moneyText, sumMoney, toMoney } from "../../../common/utils/money.utils.js";
import { assertInScope } from "../../../common/services/workScope.service.js";
import { runIdempotent } from "../../../common/services/idempotency.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, diffFields, writeAudit } from "../../../common/services/audit.service.js";
import { renderDocument, renderExcelSheet } from "../../../common/services/export.service.js";
import { drawFundSheet } from "./fundReportSheet.js";
import { INVOICE_STATES } from "../invoices/invoiceTerms.js";
import { workStatementInvoices } from "../invoices/invoices.service.js";
import { statementsGlosses } from "../invoices/invoiceGlosses.service.js";
import { FUND_MOVEMENT_TYPES, fundFigures, fundFiguresText, isAct } from "./fundFigures.js";
import { stageInvoiceWhere } from "./statementActs.service.js";

/**
 * Gerencia extractos (DEC-103). El ámbito es la obra y, si la tiene, una
 * etapa (`wksId`; null: la obra completa, o las facturas sin etapa).
 *
 * - **El acta es el extracto**: las facturas de la obra con ese texto en su
 *   campo Extracto y de esa etapa (la simple, la suya; la de contrato, la de
 *   su contrato). Su valor es el total de esas facturas sin las anuladas,
 *   calculado al leer. Se ven siempre, haya fondo o no; "aprobarla" registra
 *   la fecha de aprobación, el tipo (A o E) y, en la especial, la retención y
 *   la amortización.
 * - **El fondo rotatorio** del ámbito es opcional: agrega el tope y permite
 *   los abonos. Un abono paga a lo sumo un acta del ámbito, por no más de lo
 *   que amortiza.
 * - Alcance por obra (DEC-047): fuera, 404. Toda escritura bloquea la obra;
 *   editar o eliminar el fondo, además el fondo (FONDO_ROTATORIO).
 * - Las cifras se calculan con `fundFigures` y nunca se guardan.
 */

const FUND_NOT_FOUND = "No se encontró el fondo rotatorio.";
const MOVEMENT_NOT_FOUND = "No se encontró el acta o el abono.";
const WORK_NOT_FOUND = "No se encontró la obra.";
const STAGE_NOT_FOUND = "No se encontró la etapa en esta obra.";

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const text = (value) => String(value ?? "").trim();
const optionalText = (value) => text(value) || null;
const LIVE = { sta_id: { not: DELETED_STATUS } };
const stageOf = (wksId) => (Number(wksId) > 0 ? Number(wksId) : null);

// Clave con que se cruza el texto del extracto de las facturas y las glosas
// con el número del acta, como la intercalación de MySQL (utf8mb4_0900_ai_ci):
// sin mayúsculas ni tildes.
export const textKey = (value) =>
  String(value ?? "")
    .trim()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();

// ─── Lectura ─────────────────────────────────────────────────────────────────

const FUND_SELECT = {
  rfd_id: true,
  wrk_id: true,
  wks_id: true,
  rfd_limit: true,
  rfd_description: true,
  rfd_update_at: true,
  updated_by_user: USER_NAME_SELECT,
};

const MOVEMENT_SELECT = {
  fmv_id: true,
  wrk_id: true,
  wks_id: true,
  fmv_type: true,
  fmv_number: true,
  fmv_document_date: true,
  fmv_approval_date: true,
  fmv_value: true,
  fmv_withholding: true,
  fmv_amortization: true,
  fmv_paid_id: true,
  fmv_description: true,
  fmv_update_at: true,
  updated_by_user: USER_NAME_SELECT,
};

const toFund = (row) => ({
  rfdId: row.rfd_id,
  wrkId: row.wrk_id,
  wksId: row.wks_id,
  limit: moneyText(row.rfd_limit),
  description: row.rfd_description,
  updatedAt: row.rfd_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

const toMovement = (row) => ({
  fmvId: row.fmv_id,
  wksId: row.wks_id,
  type: row.fmv_type,
  number: row.fmv_number,
  documentDate: dateOnlyText(row.fmv_document_date),
  approvalDate: dateOnlyText(row.fmv_approval_date),
  value: moneyText(row.fmv_value),
  withholding: moneyText(row.fmv_withholding),
  amortization: moneyText(row.fmv_amortization),
  paidId: row.fmv_paid_id,
  // Especial escrita a mano: lo pagado por la fiducia no sale de facturas.
  manual: row.fmv_type === FUND_MOVEMENT_TYPES.SPECIAL && row.fmv_value !== null,
  description: row.fmv_description,
  updatedAt: row.fmv_update_at,
  updatedByName: userFullName(row.updated_by_user),
});

/** Lo que una factura aporta al acta: su total; la que no tiene importes de impuestos, su valor. */
const invoiceAmount = (inv) => inv.total ?? inv.value ?? "0";
const counts = (inv) => inv.state !== INVOICE_STATES.CANCELLED;

const toActInvoice = (inv) => ({
  invId: inv.invId,
  pvtId: inv.pvtId,
  number: inv.number,
  providerName: inv.providerName,
  menuName: inv.menuName,
  contractNumber: inv.contractNumber,
  date: inv.date,
  voucherNumber: inv.voucherNumber,
  amount: moneyText(decimal(invoiceAmount(inv))),
  state: inv.state,
  stateName: inv.stateName,
});

/**
 * Extractos del ámbito a partir de sus facturas: `Map(clave → { number,
 * invoices, total, registered, firstDate, lastDate })`. El total no cuenta
 * las anuladas; `registered`: cuántas están sin aprobar.
 */
const extractsOf = (invoices) => {
  const byKey = new Map();
  for (const inv of invoices) {
    const key = textKey(inv.statement);
    if (!byKey.has(key)) byKey.set(key, { number: text(inv.statement), invoices: [] });
    byKey.get(key).invoices.push(inv);
  }
  for (const extract of byKey.values()) {
    const live = extract.invoices.filter(counts);
    extract.total = moneyText(sumMoney(live.map((i) => decimal(invoiceAmount(i)))));
    extract.registered = live.filter((i) => i.state === INVOICE_STATES.REGISTERED).length;
    const dates = extract.invoices.map((i) => i.date).sort();
    extract.firstDate = dates[0];
    extract.lastDate = dates[dates.length - 1];
    // Con todas sus facturas aprobadas, el extracto ya está aprobado: la fecha de
    // la última aprobación. Con alguna sin aprobar (o ninguna viva), no hay.
    const approvals = live
      .map((i) => i.approvalDate)
      .filter(Boolean)
      .sort();
    extract.approvalDate = live.length > 0 && extract.registered === 0 && approvals.length > 0 ? approvals[approvals.length - 1] : null;
  }
  return byKey;
};

const findWork = async (wrkId) => {
  const work = await prisma.tbl_works.findFirst({
    where: { wrk_id: Number(wrkId), ...LIVE },
    select: {
      wrk_id: true,
      wrk_code: true,
      wrk_name: true,
      tbl_construction_companies: { select: { cnc_description: true } },
    },
  });
  if (!work) throw httpError(404, WORK_NOT_FOUND);
  return {
    wrkId: work.wrk_id,
    code: work.wrk_code,
    name: work.wrk_name,
    constructionCompany: work.tbl_construction_companies?.cnc_description ?? null,
  };
};

/** Todo lo de la obra: etapas, fondos, actas y abonos, y facturas con extracto. Una lectura por agregado. */
const loadWork = async (wrkId, scope) => {
  assertInScope(scope, wrkId, WORK_NOT_FOUND);
  const work = await findWork(wrkId);
  const [stages, funds, movements, invoices] = await Promise.all([
    prisma.tbl_work_stages.findMany({
      where: { wrk_id: work.wrkId },
      select: { wks_id: true, wks_name: true, sta_id: true },
      orderBy: [{ wks_order: "asc" }, { wks_id: "asc" }],
      take: MAX_ROWS,
    }),
    prisma.tbl_rotating_funds.findMany({
      where: { wrk_id: work.wrkId, ...LIVE },
      select: FUND_SELECT,
      take: MAX_ROWS,
    }),
    prisma.tbl_fund_movements.findMany({
      where: { wrk_id: work.wrkId, ...LIVE },
      select: MOVEMENT_SELECT,
    }),
    workStatementInvoices({ wrkId: work.wrkId }),
  ]);
  return {
    work,
    stages,
    funds: funds.map(toFund),
    movements: movements.map(toMovement),
    invoices,
  };
};

/**
 * Los ámbitos de la obra: sin etapas, la obra completa; con etapas, cada una
 * y, si algo cae fuera de ellas (facturas sin etapa, un fondo o un acta), "Sin etapa".
 */
const scopesOf = ({ stages, funds, movements, invoices }) => {
  const list = stages.map((s) => ({
    wksId: s.wks_id,
    name: s.wks_name,
    active: s.sta_id === ACTIVE_STATUS,
  }));
  const hasLoose = invoices.some((i) => i.wksId === null) || funds.some((f) => f.wksId === null) || movements.some((m) => m.wksId === null);
  if (stages.length === 0) return [{ wksId: null, name: "Obra completa", active: true }];
  return hasLoose ? [...list, { wksId: null, name: "Sin etapa", active: true }] : list;
};

/**
 * Las cifras de un ámbito: el fondo, las actas con su valor (de sus
 * facturas) y sus facturas, y los extractos que todavía no son acta.
 */
const scopeFigures = (data, wksId) => {
  const fund = data.funds.find((f) => f.wksId === wksId) ?? null;
  const extracts = extractsOf(data.invoices.filter((i) => i.wksId === wksId));
  const movements = data.movements.filter((m) => m.wksId === wksId);
  const actKeys = new Set(movements.filter((m) => isAct(m.type)).map((m) => textKey(m.number)));
  // El acta toma su valor de las facturas de su extracto; si no queda ninguna, 0.
  const valued = movements.map((m) => {
    // La especial escrita a mano conserva lo pagado por la fiducia y va en el mes de su fecha acta.
    if (m.manual) return { ...m, rowDate: m.documentDate };
    return isAct(m.type)
      ? {
          ...m,
          value: extracts.get(textKey(m.number))?.total ?? "0.00",
          // El acta va en el mes de su factura más reciente (decisión del usuario, 2026-11-18).
          rowDate: extracts.get(textKey(m.number))?.lastDate ?? null,
        }
      : m;
  });
  const figures = fundFiguresText(fundFigures(valued, fund?.limit ?? null));
  const pending = [...extracts.entries()]
    .filter(([key]) => !actKeys.has(key))
    .map(([, e]) => ({
      number: e.number,
      invoicesCount: e.invoices.length,
      registered: e.registered,
      total: e.total,
      firstDate: e.firstDate,
      lastDate: e.lastDate,
      approvalDate: e.approvalDate,
      month: dateOnlyText(e.lastDate).slice(0, 7),
      invoices: e.invoices.map(toActInvoice),
    }))
    .sort((a, b) => a.number.localeCompare(b.number, "es", { numeric: true }));
  return { fund, figures, extracts, pending };
};

/** Resumen de cada ámbito de la obra (una pestaña por ámbito). */
export const getManagement = async ({ wrkId, scope }) => {
  const data = await loadWork(wrkId, scope);
  return {
    work: data.work,
    scopes: scopesOf(data).map((s) => {
      const { fund, figures, pending } = scopeFigures(data, s.wksId);
      return {
        ...s,
        fund,
        summary: figures.summary,
        pendingCount: pending.length,
      };
    }),
  };
};

/**
 * Glosas de cada acta (DEC-085): las levantadas en el extracto con su número
 * y las liberadas en él, en la obra. `Map(clave → { raised…, released… })`.
 */
const glossesByAct = async (wrkId, numbers) => {
  if (numbers.length === 0) return new Map();
  const glosses = await statementsGlosses({ wrkIds: [wrkId], numbers });
  const byKey = new Map(
    numbers.map((n) => [
      textKey(n),
      {
        raisedCount: 0,
        raised: decimal(0),
        releasedCount: 0,
        released: decimal(0),
        items: [],
      },
    ]),
  );
  for (const g of glosses) {
    const raised = byKey.get(textKey(g.statement));
    if (raised) {
      raised.raisedCount += 1;
      raised.raised = raised.raised.plus(decimal(g.value));
      raised.items.push({
        state: "Levantada",
        statement: g.statement,
        value: g.value,
      });
    }
    const released = byKey.get(textKey(g.releaseStatement));
    if (released) {
      released.releasedCount += 1;
      released.released = released.released.plus(decimal(g.value));
      released.items.push({
        state: "Liberada",
        statement: g.statement,
        value: g.value,
      });
    }
  }
  return byKey;
};

const assertScopeExists = (data, wksId) => {
  if (!scopesOf(data).some((s) => s.wksId === wksId)) throw httpError(404, STAGE_NOT_FOUND);
};

/**
 * El cuadro de un ámbito: la obra y su constructora, el fondo (si hay), el
 * resumen (cuánto lleva la obra y cuánto se le debe a la constructora), los
 * totales por mes, cada acta con sus facturas y glosas y cada abono, y los
 * extractos que todavía no se aprueban como acta.
 */
export const getScopeReport = async ({ wrkId, wksId, scope }) => {
  const data = await loadWork(wrkId, scope);
  const stage = stageOf(wksId);
  assertScopeExists(data, stage);
  const scopeInfo = scopesOf(data).find((s) => s.wksId === stage);
  const { fund, figures, extracts, pending } = scopeFigures(data, stage);
  const acts = figures.rows.filter((r) => isAct(r.type));
  const glosses = await glossesByAct(
    data.work.wrkId,
    acts.map((a) => a.number),
  );
  const textMoney = (g) => ({
    raisedCount: g.raisedCount,
    raised: moneyText(g.raised),
    releasedCount: g.releasedCount,
    released: moneyText(g.released),
    items: g.items,
  });
  const movements = figures.rows.map((r) => {
    if (!isAct(r.type)) return { ...r, invoices: null, glosses: null };
    const extract = extracts.get(textKey(r.number));
    const own = glosses.get(textKey(r.number));
    return {
      ...r,
      invoices: extract ? extract.invoices.map(toActInvoice) : [],
      registeredInvoices: extract?.registered ?? 0,
      glosses: own ? textMoney(own) : null,
    };
  });
  return {
    work: data.work,
    scope: scopeInfo,
    fund,
    summary: {
      ...figures.summary,
      pendingValue: moneyText(sumMoney(pending.map((p) => decimal(p.total)))),
      extractsValue: moneyText(decimal(figures.summary.actsValue).plus(sumMoney(pending.map((p) => decimal(p.total))))),
    },
    months: monthsWithPending(figures.months, pending),
    nextPaymentNumber: nextPaymentNumber(movements.filter((r) => r.type === FUND_MOVEMENT_TYPES.PAYMENT).map((r) => r.number)),
    movements,
    pending,
  };
};

/**
 * Los meses del cuadro con los extractos por aprobar en el mes de su factura
 * más reciente: `pendingCount`, `pendingValue` y `extractsValue` (valor de
 * las actas + lo por aprobar: el acumulado mensual). Un mes con solo
 * extractos por aprobar cierra con el saldo del mes anterior.
 */
const monthsWithPending = (months, pending) => {
  const byMonth = new Map(months.map((m) => [m.month, { ...m, pendingCount: 0, pending: [] }]));
  for (const p of pending) {
    if (!byMonth.has(p.month))
      byMonth.set(p.month, {
        month: p.month,
        count: 0,
        fiduciary: "0.00",
        withholdings: "0.00",
        actsValue: "0.00",
        amortized: "0.00",
        payments: "0.00",
        closingBalance: null,
        pendingCount: 0,
        pending: [],
      });
    const month = byMonth.get(p.month);
    month.pendingCount += 1;
    month.pending.push(decimal(p.total));
  }
  let lastBalance = "0.00";
  return [...byMonth.values()]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(({ pending: values, ...m }) => {
      const closingBalance = m.closingBalance ?? lastBalance;
      lastBalance = closingBalance;
      const pendingValue = sumMoney(values);
      return {
        ...m,
        closingBalance,
        pendingValue: moneyText(pendingValue),
        extractsValue: moneyText(decimal(m.actsValue).plus(pendingValue)),
      };
    });
};

// ─── Fondo ───────────────────────────────────────────────────────────────────

const FUND_AUDITED = ["wrk_id", "wks_id", "rfd_limit", "rfd_description"];
const fundAuditable = (row) => ({
  ...row,
  rfd_limit: moneyText(row.rfd_limit),
});

const IDEMPOTENT_FUND = {
  model: prisma.tbl_rotating_funds,
  keyField: "rfd_idempotency_key",
  hashField: "rfd_idempotency_hash",
  ownerField: "rfd_create_by",
  select: { rfd_id: true },
  toResult: (row) => ({
    message: "Fondo rotatorio creado correctamente",
    rfdId: row.rfd_id,
  }),
};

const fundValues = (input) => {
  const limit = toMoney(input.limit);
  if (limit === null) throw httpError(400, "El tope del fondo es requerido.");
  return { rfd_limit: limit, rfd_description: optionalText(input.description) };
};

/** La etapa del ámbito, de la obra y activa (si se crea algo nuevo en ella). */
const assertStage = async (tx, wrkId, wksId) => {
  if (!wksId) return;
  const stage = await tx.tbl_work_stages.findFirst({
    where: { wks_id: wksId, wrk_id: wrkId },
    select: { sta_id: true },
  });
  if (!stage) throw httpError(404, STAGE_NOT_FOUND);
};

const assertLiveWork = async (tx, wrkId) => {
  const work = await tx.tbl_works.findUnique({
    where: { wrk_id: wrkId },
    select: { sta_id: true },
  });
  if (!work || work.sta_id === DELETED_STATUS) throw httpError(404, WORK_NOT_FOUND);
};

const createFund = ({ wrkId, wksId, values, useBy, ctx, idempotencyKey }) =>
  runIdempotent({
    target: IDEMPOTENT_FUND,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { wrkId, wksId, ...fundAuditable(values) },
    execute: (idempotencyData) =>
      withLockedTransaction({ OBRA: wrkId }, async (tx) => {
        await assertLiveWork(tx, wrkId);
        await assertStage(tx, wrkId, wksId);
        const duplicate = await tx.tbl_rotating_funds.findFirst({
          where: { wrk_id: wrkId, wks_id: wksId, ...LIVE },
          select: { rfd_id: true },
        });
        if (duplicate) throw httpError(409, wksId ? "La etapa ya tiene un fondo rotatorio." : "La obra ya tiene un fondo rotatorio.");
        const data = { ...values, wrk_id: wrkId, wks_id: wksId };
        const created = await tx.tbl_rotating_funds.create({
          data: {
            ...data,
            sta_id: ACTIVE_STATUS,
            rfd_create_by: useBy,
            rfd_update_by: useBy,
            ...idempotencyData,
          },
          select: { rfd_id: true },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.ROTATING_FUND,
          recordId: created.rfd_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: diffFields({}, fundAuditable(data), FUND_AUDITED),
        });
        return {
          message: "Fondo rotatorio creado correctamente",
          rfdId: created.rfd_id,
        };
      }),
  });

// La obra del fondo no cambia: se lee antes del bloqueo para el alcance y para bloquearla.
const immutableFund = async (rfdId, scope) => {
  const row = await prisma.tbl_rotating_funds.findUnique({
    where: { rfd_id: Number(rfdId) },
    select: { wrk_id: true, sta_id: true },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, FUND_NOT_FOUND);
  assertInScope(scope, row.wrk_id, FUND_NOT_FOUND);
  return row.wrk_id;
};

const findLockedFund = async (tx, rfdId) => {
  const row = await tx.tbl_rotating_funds.findUnique({
    where: { rfd_id: Number(rfdId) },
    select: {
      rfd_id: true,
      wrk_id: true,
      wks_id: true,
      rfd_limit: true,
      rfd_description: true,
      sta_id: true,
    },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, FUND_NOT_FOUND);
  return row;
};

/** Sin id (0, vacío o null): crear. */
const isNewId = (id) => Number.isNaN(Number(id)) || Number(id) <= 0;

/**
 * Crear el fondo de un ámbito (sin `rfdId`, con la obra y, opcional, la
 * etapa) o cambiar su tope y su descripción. Crear exige `Idempotency-Key`.
 */
export const saveFund = async ({ rfdId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  const values = fundValues(input);
  if (isNewId(rfdId)) {
    const wrkId = Number(input.wrkId);
    assertInScope(scope, wrkId, WORK_NOT_FOUND);
    return createFund({
      wrkId,
      wksId: stageOf(input.wksId),
      values,
      useBy: Number(useBy),
      ctx,
      idempotencyKey,
    });
  }

  const wrkId = await immutableFund(rfdId, scope);
  return withLockedTransaction(
    { OBRA: wrkId, FONDO_ROTATORIO: Number(rfdId) },
    async (tx) => {
      const before = await findLockedFund(tx, rfdId);
      const changes = diffFields(fundAuditable(before), fundAuditable(values), FUND_AUDITED);
      if (changes.length > 0) {
        await tx.tbl_rotating_funds.update({
          where: { rfd_id: before.rfd_id },
          data: { ...values, rfd_update_by: Number(useBy) },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.ROTATING_FUND,
          recordId: before.rfd_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes,
        });
      }
      return {
        message: "Fondo rotatorio modificado correctamente",
        rfdId: before.rfd_id,
      };
    },
    { idempotent: true },
  );
};

/** Eliminación lógica (DEC-006). Un fondo con abonos no se elimina; las actas no dependen del fondo. */
export const deleteFund = async ({ rfdId, useBy, scope, ctx = { useId: useBy } }) => {
  const wrkId = await immutableFund(rfdId, scope);
  return withLockedTransaction({ OBRA: wrkId, FONDO_ROTATORIO: Number(rfdId) }, async (tx) => {
    const before = await findLockedFund(tx, rfdId);
    const payments = await tx.tbl_fund_movements.count({
      where: {
        wrk_id: before.wrk_id,
        wks_id: before.wks_id,
        fmv_type: FUND_MOVEMENT_TYPES.PAYMENT,
        ...LIVE,
      },
    });
    if (payments > 0) throw httpError(409, `No se puede eliminar el fondo: tiene ${payments} abono(s). Elimínalos primero.`);
    await tx.tbl_rotating_funds.update({
      where: { rfd_id: before.rfd_id },
      data: {
        sta_id: DELETED_STATUS,
        rfd_update_by: Number(useBy),
        rfd_delete_by: Number(useBy),
        rfd_delete_at: new Date(),
      },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.ROTATING_FUND,
      recordId: before.rfd_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: diffFields(before, { sta_id: DELETED_STATUS }, ["sta_id"]),
    });
    return { message: "Fondo rotatorio eliminado correctamente" };
  });
};

// ─── Actas y abonos ──────────────────────────────────────────────────────────

const MOVEMENT_AUDITED = [
  "wrk_id",
  "wks_id",
  "fmv_type",
  "fmv_number",
  "fmv_document_date",
  "fmv_approval_date",
  "fmv_value",
  "fmv_withholding",
  "fmv_amortization",
  "fmv_paid_id",
  "fmv_description",
];

const movementAuditable = (row) => ({
  ...row,
  fmv_document_date: dateOnlyText(row.fmv_document_date),
  fmv_approval_date: dateOnlyText(row.fmv_approval_date),
  fmv_value: moneyText(row.fmv_value),
  fmv_withholding: moneyText(row.fmv_withholding),
  fmv_amortization: moneyText(row.fmv_amortization),
});

/** Fecha del documento y de aprobación: la aprobación no es anterior al documento (CHECK de la migración 0131). */
const movementDates = (input) => {
  const documentDate = toDateOnly(input.documentDate);
  const approvalDate = toDateOnly(input.approvalDate);
  if (!documentDate) throw httpError(400, "La fecha del documento no es válida.");
  if (!approvalDate) throw httpError(400, "La fecha de aprobación no es válida.");
  if (approvalDate < documentDate) throw httpError(400, "La fecha de aprobación no puede ser anterior a la del documento.");
  return { documentDate, approvalDate };
};

const requiredMoney = (value, message) => {
  const amount = toMoney(value);
  if (amount === null) throw httpError(400, message);
  return amount;
};

/**
 * Los importes de cada tipo; lo que no le aplica queda en NULL (CHECK de la
 * migración 0131). El abono, su valor. La especial, la retención y la
 * amortización; si es escrita a mano (`manual`), lo pagado por la fiducia y
 * una amortización igual a la retención. La de un extracto toma lo pagado de
 * sus facturas.
 */
const amountsOf = (type, input, manual) => {
  if (type === FUND_MOVEMENT_TYPES.PAYMENT) {
    return { value: requiredMoney(input.value, "El valor del abono es requerido."), withholding: null, amortization: null };
  }
  if (type !== FUND_MOVEMENT_TYPES.SPECIAL) return { value: null, withholding: null, amortization: null };
  const withholding = requiredMoney(input.withholding, "La retención de pagos especiales es requerida.");
  // Escrita a mano, al fondo se le amortiza lo mismo que se retiene (decisión del usuario, 2026-11-20):
  // un solo valor. La de un extracto escribe los dos (pueden ser distintos).
  if (manual)
    return { value: requiredMoney(input.value, "Lo pagado por la fiducia es requerido."), withholding, amortization: withholding };
  return { value: null, withholding, amortization: requiredMoney(input.amortization, "La amortización al fondo es requerida.") };
};

/**
 * Las columnas de un acta o un abono. `manual`: acta especial escrita a mano
 * (desde "Nuevo abono / especial"), con lo pagado por la fiducia en
 * `fmv_value`; la de un extracto lo toma de sus facturas (NULL).
 */
const movementValues = (type, input, { manual = false } = {}) => {
  if (!Object.values(FUND_MOVEMENT_TYPES).includes(type)) throw httpError(400, "El tipo debe ser acta, acta especial o abono.");
  // El número del abono lo asigna el servidor al crearlo (consecutivo del ámbito).
  const number = text(input.number);
  const payment = type === FUND_MOVEMENT_TYPES.PAYMENT;
  if (!number && !payment) throw httpError(400, "El extracto del acta es requerido.");
  const { documentDate, approvalDate } = movementDates(input);
  const { value, withholding, amortization } = amountsOf(type, input, manual);
  return {
    fmv_type: type,
    fmv_number: number,
    fmv_document_date: documentDate,
    fmv_approval_date: approvalDate,
    fmv_value: value,
    fmv_withholding: withholding,
    fmv_amortization: amortization,
    fmv_paid_id: payment && Number(input.paidId) > 0 ? Number(input.paidId) : null,
    fmv_description: optionalText(input.description),
  };
};

const numberGroup = (type) =>
  type === FUND_MOVEMENT_TYPES.PAYMENT ? { fmv_type: FUND_MOVEMENT_TYPES.PAYMENT } : { fmv_type: { not: FUND_MOVEMENT_TYPES.PAYMENT } };

/**
 * El siguiente número de abono del ámbito: el mayor número entero de sus
 * abonos vivos + 1, con dos cifras como el cuadro de Intervé ("01", "02"…).
 * Un número que no sea entero (escrito a mano antes) no cuenta.
 */
export const nextPaymentNumber = (numbers) => {
  const max = numbers.filter((n) => /^\d+$/.test(String(n ?? "").trim())).reduce((acc, n) => Math.max(acc, Number.parseInt(n, 10)), 0);
  return String(max + 1).padStart(2, "0");
};

// Bajo el bloqueo de la obra: dos abonos a la vez no toman el mismo número.
const assignPaymentNumber = async (tx, { wrkId, wksId }) => {
  const rows = await tx.tbl_fund_movements.findMany({
    where: { wrk_id: wrkId, wks_id: wksId, fmv_type: FUND_MOVEMENT_TYPES.PAYMENT, ...LIVE },
    select: { fmv_number: true },
  });
  return nextPaymentNumber(rows.map((r) => r.fmv_number));
};

const assertUniqueNumber = async (tx, { wrkId, wksId, type, number, excludeId = null }) => {
  const duplicate = await tx.tbl_fund_movements.findFirst({
    where: {
      wrk_id: wrkId,
      wks_id: wksId,
      fmv_number: number,
      ...numberGroup(type),
      ...LIVE,
      ...(excludeId ? { fmv_id: { not: excludeId } } : {}),
    },
    select: { fmv_id: true },
  });
  if (duplicate) {
    throw httpError(
      409,
      type === FUND_MOVEMENT_TYPES.PAYMENT ? `Ya existe el abono ${number} aquí.` : `El extracto ${number} ya es un acta aprobada aquí.`,
    );
  }
};

/** Un acta necesita facturas en su extracto (sin las anuladas), en su obra y su etapa. */
const assertExtractHasInvoices = async (tx, { wrkId, wksId, number }) => {
  const count = await tx.tbl_invoices.count({
    where: {
      wrk_id: wrkId,
      inv_statement: number,
      inv_state: { not: INVOICE_STATES.CANCELLED },
      ...LIVE,
      ...stageInvoiceWhere(wksId),
    },
  });
  if (count === 0) throw httpError(409, `El extracto ${number} no tiene facturas aquí: el acta sale de las facturas con ese extracto.`);
};

/** Lo que amortiza un acta: la normal, el total de sus facturas (al leer); la especial, lo escrito. */
const actAmortization = async (act) => {
  if (act.fmv_type === FUND_MOVEMENT_TYPES.SPECIAL) return decimal(act.fmv_amortization);
  const invoices = (await workStatementInvoices({ wrkId: act.wrk_id })).filter(
    (i) => i.wksId === act.wks_id && textKey(i.statement) === textKey(act.fmv_number) && counts(i),
  );
  return sumMoney(invoices.map((i) => decimal(invoiceAmount(i))));
};

/**
 * El acta que paga un abono: de la misma obra y etapa, viva, un acta, sin
 * otro abono que la pague, y por no más de lo que amortiza.
 */
const assertPayable = async (tx, { wrkId, wksId, paidId, value, excludeId = null }) => {
  const act = await tx.tbl_fund_movements.findFirst({
    where: { fmv_id: paidId, wrk_id: wrkId, wks_id: wksId, ...LIVE },
    select: {
      wrk_id: true,
      wks_id: true,
      fmv_type: true,
      fmv_number: true,
      fmv_amortization: true,
    },
  });
  if (!act || !isAct(act.fmv_type)) throw httpError(404, "No se encontró aquí el acta que paga el abono.");
  const other = await tx.tbl_fund_movements.findFirst({
    where: {
      fmv_paid_id: paidId,
      ...LIVE,
      ...(excludeId ? { fmv_id: { not: excludeId } } : {}),
    },
    select: { fmv_number: true },
  });
  if (other) throw httpError(409, `El acta ${act.fmv_number} ya la paga el abono ${other.fmv_number}.`);
  const amortization = await actAmortization(act);
  if (decimal(value).gt(amortization)) {
    throw httpError(400, `El abono supera lo que el acta ${act.fmv_number} amortiza al fondo (${moneyText(amortization)}).`);
  }
};

/** Un abono necesita el fondo rotatorio de su obra o etapa. */
const assertFundExists = async (tx, { wrkId, wksId }) => {
  const fund = await tx.tbl_rotating_funds.findFirst({
    where: { wrk_id: wrkId, wks_id: wksId, ...LIVE },
    select: { rfd_id: true },
  });
  if (!fund) throw httpError(409, "Para registrar abonos, primero crea el fondo rotatorio de esta obra o etapa.");
};

const IDEMPOTENT_MOVEMENT = {
  model: prisma.tbl_fund_movements,
  keyField: "fmv_idempotency_key",
  hashField: "fmv_idempotency_hash",
  ownerField: "fmv_create_by",
  select: { fmv_id: true, fmv_type: true },
  toResult: (row) => ({
    message: messageOf(row.fmv_type, "creado"),
    fmvId: row.fmv_id,
  }),
};

const messageOf = (type, action) =>
  type === FUND_MOVEMENT_TYPES.PAYMENT ? `Abono ${action} correctamente` : `Acta ${action.replace(/o$/, "a")} correctamente`;

const createMovement = ({ wrkId, wksId, values: input, useBy, ctx, idempotencyKey }) =>
  runIdempotent({
    target: IDEMPOTENT_MOVEMENT,
    key: idempotencyKey,
    ownerId: useBy,
    payload: { wrkId, wksId, ...movementAuditable(input) },
    execute: (idempotencyData) =>
      withLockedTransaction({ OBRA: wrkId }, async (tx) => {
        let values = input;
        await assertLiveWork(tx, wrkId);
        await assertStage(tx, wrkId, wksId);
        const type = values.fmv_type;
        if (type === FUND_MOVEMENT_TYPES.PAYMENT) values = { ...values, fmv_number: await assignPaymentNumber(tx, { wrkId, wksId }) };
        else
          await assertUniqueNumber(tx, {
            wrkId,
            wksId,
            type,
            number: values.fmv_number,
          });
        // El acta sale de las facturas de su extracto; la especial escrita a mano, no. Solo el abono exige el fondo.
        if (isAct(type)) {
          if (values.fmv_value === null)
            await assertExtractHasInvoices(tx, {
              wrkId,
              wksId,
              number: values.fmv_number,
            });
        } else {
          await assertFundExists(tx, { wrkId, wksId });
          if (values.fmv_paid_id)
            await assertPayable(tx, {
              wrkId,
              wksId,
              paidId: values.fmv_paid_id,
              value: values.fmv_value,
            });
        }
        const data = { ...values, wrk_id: wrkId, wks_id: wksId };
        const created = await tx.tbl_fund_movements.create({
          data: {
            ...data,
            sta_id: ACTIVE_STATUS,
            fmv_create_by: useBy,
            fmv_update_by: useBy,
            ...idempotencyData,
          },
          select: { fmv_id: true },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.FUND_MOVEMENT,
          recordId: created.fmv_id,
          operation: AUDIT_OPERATIONS.CREATE,
          ctx,
          changes: diffFields({}, movementAuditable(data), MOVEMENT_AUDITED),
        });
        return { message: messageOf(type, "creado"), fmvId: created.fmv_id };
      }),
  });

// La obra, la etapa y el tipo no cambian: se leen antes del bloqueo para el alcance y para bloquear la obra.
const immutableMovement = async (fmvId, scope) => {
  const row = await prisma.tbl_fund_movements.findUnique({
    where: { fmv_id: Number(fmvId) },
    select: {
      wrk_id: true,
      wks_id: true,
      fmv_type: true,
      fmv_number: true,
      fmv_value: true,
      sta_id: true,
    },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, MOVEMENT_NOT_FOUND);
  assertInScope(scope, row.wrk_id, MOVEMENT_NOT_FOUND);
  return {
    wrkId: row.wrk_id,
    wksId: row.wks_id,
    type: row.fmv_type,
    number: row.fmv_number,
    manual: row.fmv_type === FUND_MOVEMENT_TYPES.SPECIAL && row.fmv_value !== null,
  };
};

const findLockedMovement = async (tx, fmvId) => {
  const row = await tx.tbl_fund_movements.findUnique({
    where: { fmv_id: Number(fmvId) },
    select: {
      fmv_id: true,
      wrk_id: true,
      wks_id: true,
      fmv_type: true,
      fmv_number: true,
      fmv_document_date: true,
      fmv_approval_date: true,
      fmv_value: true,
      fmv_withholding: true,
      fmv_amortization: true,
      fmv_paid_id: true,
      fmv_description: true,
      sta_id: true,
    },
  });
  if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, MOVEMENT_NOT_FOUND);
  return row;
};

/** El abono vivo que paga el acta, si hay. */
const paymentOfAct = (tx, fmvId) =>
  tx.tbl_fund_movements.findFirst({
    where: { fmv_paid_id: fmvId, ...LIVE },
    select: { fmv_number: true, fmv_value: true },
  });

/** Lo que amortiza un acta especial no puede quedar por debajo del abono que ya la paga (409). */
const assertCoversPayment = async (tx, fmvId, values) => {
  if (values.fmv_type !== FUND_MOVEMENT_TYPES.SPECIAL) return;
  const payment = await paymentOfAct(tx, fmvId);
  if (payment && decimal(payment.fmv_value).gt(decimal(values.fmv_amortization))) {
    throw httpError(
      409,
      `El acta la paga el abono ${payment.fmv_number} por ${moneyText(payment.fmv_value)}: lo que amortiza no puede ser menor.`,
    );
  }
};

/**
 * Aprobar un extracto como acta, o registrar un abono (sin `fmvId`, con la
 * obra, la etapa y el tipo), o editarlos. La obra, la etapa y el tipo no
 * cambian; el extracto de un acta tampoco. Crear exige `Idempotency-Key`.
 */
export const saveFundMovement = async ({ fmvId, input, useBy, scope, ctx = { useId: useBy }, idempotencyKey }) => {
  if (isNewId(fmvId)) {
    const wrkId = Number(input.wrkId);
    assertInScope(scope, wrkId, WORK_NOT_FOUND);
    // Una especial con lo pagado por la fiducia escrito es la escrita a mano: no necesita facturas.
    const manual = input.type === FUND_MOVEMENT_TYPES.SPECIAL && text(input.value) !== "";
    const values = movementValues(input.type, input, { manual });
    return createMovement({
      wrkId,
      wksId: stageOf(input.wksId),
      values,
      useBy: Number(useBy),
      ctx,
      idempotencyKey,
    });
  }

  const current = await immutableMovement(fmvId, scope);
  // El número no cambia: el extracto une el acta a sus facturas, y el del abono es su consecutivo.
  // Un acta pasa de A a E (o al revés) al editarla; un abono sigue siendo abono, y la especial
  // escrita a mano sigue siendo especial: no tiene facturas de las que salga un acta A.
  const type = !current.manual && isAct(current.type) && isAct(input.type) ? input.type : current.type;
  const values = movementValues(type, { ...input, number: current.number }, { manual: current.manual });
  return withLockedTransaction(
    { OBRA: current.wrkId },
    async (tx) => {
      const before = await findLockedMovement(tx, fmvId);
      if (values.fmv_type !== before.fmv_type) {
        const payment = await paymentOfAct(tx, before.fmv_id);
        if (payment)
          throw httpError(
            409,
            `El acta ${before.fmv_number} la paga el abono ${payment.fmv_number}: elimina el abono para cambiar su tipo.`,
          );
      }
      const changes = diffFields(movementAuditable(before), movementAuditable(values), MOVEMENT_AUDITED);
      if (changes.length > 0) {
        const scopeOf = { wrkId: before.wrk_id, wksId: before.wks_id };
        if (values.fmv_number !== before.fmv_number) {
          await assertUniqueNumber(tx, {
            ...scopeOf,
            type: current.type,
            number: values.fmv_number,
            excludeId: before.fmv_id,
          });
        }
        if (values.fmv_paid_id)
          await assertPayable(tx, {
            ...scopeOf,
            paidId: values.fmv_paid_id,
            value: values.fmv_value,
            excludeId: before.fmv_id,
          });
        await assertCoversPayment(tx, before.fmv_id, values);
        await tx.tbl_fund_movements.update({
          where: { fmv_id: before.fmv_id },
          data: { ...values, fmv_update_by: Number(useBy) },
        });
        await writeAudit(tx, {
          entity: AUDIT_ENTITIES.FUND_MOVEMENT,
          recordId: before.fmv_id,
          operation: AUDIT_OPERATIONS.UPDATE,
          ctx,
          changes,
        });
      }
      return {
        message: messageOf(current.type, "modificado"),
        fmvId: before.fmv_id,
      };
    },
    { idempotent: true },
  );
};

/**
 * Eliminación lógica (DEC-006). Eliminar un acta la devuelve a los extractos
 * por aprobar (sus facturas no se tocan). Un acta que paga un abono no se
 * elimina: primero el abono.
 */
export const deleteFundMovement = async ({ fmvId, useBy, scope, ctx = { useId: useBy } }) => {
  const current = await immutableMovement(fmvId, scope);
  return withLockedTransaction({ OBRA: current.wrkId }, async (tx) => {
    const before = await findLockedMovement(tx, fmvId);
    if (isAct(current.type)) {
      const payment = await paymentOfAct(tx, before.fmv_id);
      if (payment)
        throw httpError(
          409,
          `No se puede eliminar el acta ${before.fmv_number}: la paga el abono ${payment.fmv_number}. Elimínalo primero.`,
        );
    }
    await tx.tbl_fund_movements.update({
      where: { fmv_id: before.fmv_id },
      data: {
        sta_id: DELETED_STATUS,
        fmv_update_by: Number(useBy),
        fmv_delete_by: Number(useBy),
        fmv_delete_at: new Date(),
      },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.FUND_MOVEMENT,
      recordId: before.fmv_id,
      operation: AUDIT_OPERATIONS.DELETE,
      ctx,
      changes: diffFields(before, { sta_id: DELETED_STATUS }, ["sta_id"]),
    });
    return { message: messageOf(current.type, "eliminado") };
  });
};

// ─── Reporte ─────────────────────────────────────────────────────────────────

const MONTH_FORMAT = new Intl.DateTimeFormat("es-CO", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10" → "oct. 2026". */
export const monthLabel = (month) => MONTH_FORMAT.format(new Date(`${month}-01T00:00:00Z`));

const glossText = (g) => {
  if (!g?.items?.length) return null;
  return g.items.map((item) => `Glosa ${item.statement ?? ""} ${item.state}: ${item.value}`).join(" · ");
};

const MONTH_COLUMNS = [
  { header: "Mes", value: (r) => r.label },
  { header: "Movimientos", value: (r) => String(r.count) },
  {
    header: "Fondo (F) / especiales (E)",
    value: (r) => r.fiduciary,
    kind: "money",
  },
  {
    header: "Retenc. pagos espec.",
    value: (r) => r.withholdings,
    kind: "money",
  },
  { header: "Valor actas", value: (r) => r.actsValue, kind: "money" },
  { header: "Amortización fondo", value: (r) => r.amortized, kind: "money" },
  { header: "Saldo al cierre", value: (r) => r.closingBalance, kind: "money" },
  { header: "Por aprobar", value: (r) => r.pendingValue, kind: "money" },
  { header: "Acumulado mensual actas", value: (r) => r.extractsValue, kind: "money" },
];

const MOVEMENT_COLUMNS = [
  { header: "Mes", value: (r) => r.monthLabel },
  { header: "Número", value: (r) => r.number },
  { header: "Tipo", value: (r) => r.letter },
  { header: "Fecha acta", value: (r) => r.documentDate, kind: "date" },
  { header: "Fecha aprob.", value: (r) => r.approvalDate, kind: "date" },
  {
    header: "Facturas",
    value: (r) => (r.invoices ? String(r.invoices.length) : ""),
  },
  {
    header: "Fondo (F) / especiales (E)",
    value: (r) => r.fiduciary,
    kind: "money",
  },
  {
    header: "Retenc. pagos espec.",
    value: (r) => r.withholding,
    kind: "money",
  },
  { header: "Valor actas", value: (r) => r.actValue, kind: "money" },
  { header: "Amortización fondo", value: (r) => r.amortization, kind: "money" },
  { header: "Saldo fondo", value: (r) => r.balanceAfter, kind: "money" },
  { header: "Pago", value: (r) => r.payment },
  { header: "Glosas", value: (r) => r.glossText, width: 2 },
];

const PENDING_COLUMNS = [
  { header: "Extracto", value: (r) => r.number },
  { header: "Facturas", value: (r) => String(r.invoicesCount) },
  { header: "Sin aprobar", value: (r) => String(r.registered) },
  { header: "Primera factura", value: (r) => r.firstDate, kind: "date" },
  { header: "Última factura", value: (r) => r.lastDate, kind: "date" },
  { header: "Total facturas", value: (r) => r.total, kind: "money" },
];

const moneySum = (rows, key) =>
  moneyText(
    sumMoney(
      rows
        .map((r) => r[key])
        .filter((v) => v !== null && v !== undefined)
        .map(decimal),
    ),
  );

const movementTotals = (rows, label) => ({
  monthLabel: label,
  fiduciary: moneySum(rows, "fiduciary"),
  withholding: moneySum(rows, "withholding"),
  actValue: moneySum(rows, "actValue"),
  amortization: moneySum(rows, "amortization"),
});

const paymentText = (r) => {
  if (isAct(r.type)) return r.paidByNumber ? `Pagada con abono ${r.paidByNumber}` : `Pendiente ${r.owed}`;
  return r.paidNumber ? `Paga el acta ${r.paidNumber}` : "Entrega al fondo";
};

/** El cuadro del ámbito en Excel o PDF (DEC-070), con las mismas cifras de la pantalla. */
export const exportScopeReport = async ({ wrkId, wksId, format, scope }) => {
  const report = await getScopeReport({ wrkId, wksId, scope });
  const { work, fund, summary, months, movements, pending } = report;
  const rows = movements.map((r) => ({
    ...r,
    monthLabel: monthLabel(r.month),
    payment: paymentText(r),
    glossText: glossText(r.glosses),
  }));
  const workName = [work.code, work.name].filter(Boolean).join(" — ");
  // En Excel, el cuadro igual que la tabla de la pantalla; en PDF, por secciones.
  if (format === "xlsx")
    return renderExcelSheet({
      title: "Gerencia extractos — control de pagos",
      heading: `Obra: ${workName} · ${report.scope.name}`,
      sheetTitle: "Control de pagos",
      draw: (sheet) => drawFundSheet(sheet, report),
    });
  return renderDocument({
    format,
    title: "Gerencia extractos — control de pagos",
    heading: `Obra: ${workName} · ${report.scope.name}`,
    sections: [
      {
        title: "Resumen",
        fields: [
          { label: "Constructora", value: work.constructionCompany },
          {
            label: "Tope del fondo",
            value: fund ? summary.limit : "Sin fondo rotatorio",
            kind: fund ? "money" : undefined,
          },
          {
            label: "Total abonos al fondo",
            value: summary.payments,
            kind: "money",
          },
          {
            label: "Total pagos actas especiales",
            value: summary.specialPayments,
            kind: "money",
          },
          {
            label: "Total pagos por la fiducia",
            value: summary.fiduciary,
            kind: "money",
          },
          {
            label: "Retenciones de pagos especiales",
            value: summary.withholdings,
            kind: "money",
          },
          {
            label: "Total pagos actas",
            value: summary.actsValue,
            kind: "money",
          },
          {
            label: "Total actas que amortizan el fondo",
            value: summary.amortized,
            kind: "money",
          },
          {
            label: "Saldo del fondo rotatorio",
            value: summary.balance,
            kind: "money",
          },
          {
            label: "Se le debe a la constructora",
            value: summary.owed,
            kind: "money",
          },
        ],
      },
      {
        title: "Resumen por mes",
        columns: MONTH_COLUMNS,
        rows: months.map((m) => ({ ...m, label: monthLabel(m.month) })),
        totals: months.length
          ? {
              label: "Total",
              count: movements.length,
              fiduciary: summary.fiduciary,
              withholdings: summary.withholdings,
              actsValue: summary.actsValue,
              amortized: summary.amortized,
              closingBalance: summary.balance,
              pendingValue: summary.pendingValue,
              extractsValue: summary.extractsValue,
            }
          : null,
        empty: "Todavía no hay actas aprobadas ni abonos.",
      },
      {
        title: "Actas y abonos",
        columns: MOVEMENT_COLUMNS,
        rows,
        // Por mes, en orden (la etiqueta empieza por "AAAA-MM"), con su subtotal, como el cuadro de Intervé.
        rowGroups: {
          label: (r) => `${r.month} · ${r.monthLabel}`,
          column: "Mes",
          subtotal: (own) => movementTotals(own, "Subtotal"),
        },
        totals: rows.length ? movementTotals(rows, "Total") : null,
        empty: "Todavía no hay actas aprobadas ni abonos.",
      },
      {
        title: "Extractos por aprobar como acta",
        columns: PENDING_COLUMNS,
        rows: pending,
        empty: "No hay extractos por aprobar.",
      },
    ],
  });
};
