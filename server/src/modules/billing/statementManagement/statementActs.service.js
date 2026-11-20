import { prisma } from "../../../common/configs/prismaClient.js";
import logger from "../../../common/configs/winston.config.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { dateOnlyText } from "../../../common/utils/term.utils.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, writeAudit } from "../../../common/services/audit.service.js";
import { INVOICE_STATES } from "../invoices/invoiceTerms.js";
import { FUND_MOVEMENT_TYPES } from "./fundFigures.js";

/**
 * Acta automática (DEC-103, decisión del usuario del 2026-11-20): cuando todas
 * las facturas vivas de un extracto (sin las anuladas) quedan aprobadas, el
 * extracto pasa solo a acta normal (A), con la fecha de su factura más
 * reciente y la de la última aprobación. Si después resulta especial (E), se
 * cambia al editarla.
 *
 * Corre después de la operación sobre la factura (aprobar, anular, eliminar,
 * cambiar su extracto o su etapa), en su propia transacción: el acta se
 * guarda bloqueando la obra, que va antes del contrato y de la factura en
 * LOCK_ORDER (ADR-0027), así que no cabe en la transacción de la factura. Es
 * idempotente: si el acta ya existe, no hace nada. Si falla, la factura
 * queda como quedó y el extracto sigue por aprobar en Gerencia extractos.
 *
 * Sin dependencia de invoices.service: la importa él.
 */

const LIVE = { sta_id: { not: DELETED_STATUS } };
const text = (value) => String(value ?? "").trim();

/** Las facturas de la etapa (o sin etapa): la simple, la suya; la de contrato, la de su contrato. */
export const stageInvoiceWhere = (wksId) =>
  wksId
    ? { OR: [{ wks_id: wksId }, { tbl_contracts: { is: { wks_id: wksId } } }] }
    : {
        wks_id: null,
        OR: [{ ctr_id: null }, { tbl_contracts: { is: { wks_id: null } } }],
      };

const latest = (dates) =>
  dates
    .filter(Boolean)
    .sort((a, b) => a.getTime() - b.getTime())
    .at(-1) ?? null;

/**
 * Crea el acta A del extracto `statement` en la obra y la etapa, si todas sus
 * facturas vivas están aprobadas y todavía no es acta. Devuelve el `fmvId`
 * creado, o null. El texto se compara con la intercalación de la BD (sin
 * mayúsculas ni tildes), como el resto de Gerencia extractos.
 */
export const createActIfApproved = async ({ wrkId, wksId, statement, useBy, ctx }) => {
  const number = text(statement);
  if (!wrkId || !number) return null;
  return withLockedTransaction({ OBRA: wrkId }, async (tx) => {
    const existing = await tx.tbl_fund_movements.findFirst({
      where: { wrk_id: wrkId, wks_id: wksId, fmv_number: number, fmv_type: { not: FUND_MOVEMENT_TYPES.PAYMENT }, ...LIVE },
      select: { fmv_id: true },
    });
    if (existing) return null;
    const invoices = await tx.tbl_invoices.findMany({
      where: { wrk_id: wrkId, inv_statement: number, inv_state: { not: INVOICE_STATES.CANCELLED }, ...LIVE, ...stageInvoiceWhere(wksId) },
      select: { inv_state: true, inv_date: true, inv_approval_date: true },
    });
    if (invoices.length === 0 || invoices.some((i) => i.inv_state !== INVOICE_STATES.APPROVED)) return null;

    const data = {
      wrk_id: wrkId,
      wks_id: wksId,
      fmv_type: FUND_MOVEMENT_TYPES.NORMAL,
      fmv_number: number,
      fmv_document_date: latest(invoices.map((i) => i.inv_date)),
      fmv_approval_date: latest(invoices.map((i) => i.inv_approval_date)) ?? latest(invoices.map((i) => i.inv_date)),
      fmv_description: "Acta registrada al aprobarse todas las facturas del extracto.",
    };
    const created = await tx.tbl_fund_movements.create({
      data: { ...data, sta_id: ACTIVE_STATUS, fmv_create_by: Number(useBy), fmv_update_by: Number(useBy) },
      select: { fmv_id: true },
    });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.FUND_MOVEMENT,
      recordId: created.fmv_id,
      operation: AUDIT_OPERATIONS.CREATE,
      ctx,
      changes: [
        { field: "wrk_id", oldValue: null, newValue: wrkId },
        { field: "wks_id", oldValue: null, newValue: wksId },
        { field: "fmv_type", oldValue: null, newValue: data.fmv_type },
        { field: "fmv_number", oldValue: null, newValue: number },
        { field: "fmv_document_date", oldValue: null, newValue: dateOnlyText(data.fmv_document_date) },
        { field: "fmv_approval_date", oldValue: null, newValue: dateOnlyText(data.fmv_approval_date) },
        { field: "fmv_description", oldValue: null, newValue: data.fmv_description },
      ],
    });
    return created.fmv_id;
  });
};

/** El extracto y la etapa de una factura (la de contrato, la de su contrato), aunque esté anulada o eliminada. */
export const invoiceStatementTarget = async (invId) => {
  const row = await prisma.tbl_invoices.findUnique({
    where: { inv_id: Number(invId) },
    select: { wrk_id: true, wks_id: true, inv_statement: true, tbl_contracts: { select: { wks_id: true } } },
  });
  if (!row || !text(row.inv_statement)) return null;
  return { wrkId: row.wrk_id, wksId: row.wks_id ?? row.tbl_contracts?.wks_id ?? null, statement: text(row.inv_statement) };
};

const sameTarget = (a, b) => a.wrkId === b.wrkId && a.wksId === b.wksId && a.statement.toLowerCase() === b.statement.toLowerCase();

/**
 * Después de operar sobre una factura: crea el acta de cada extracto que
 * tocó (`targets`: el de antes y el de después), si ya quedó aprobado. Nunca
 * falla: un error se registra y el extracto sigue por aprobar.
 */
export const syncStatementActs = async (targets, { useBy, ctx }) => {
  const unique = targets.filter(Boolean).filter((t, i, all) => all.findIndex((o) => sameTarget(o, t)) === i);
  for (const target of unique) {
    try {
      await createActIfApproved({ ...target, useBy, ctx });
    } catch (err) {
      logger.warn(
        `[gerencia extractos] No se pudo registrar el acta del extracto "${target.statement}" de la obra ${target.wrkId}: ${err?.message ?? err}`,
      );
    }
  }
};
