import { decimal, moneyText, sumMoney } from "../../../common/utils/money.utils.js";
import { dateOnlyText } from "../../../common/utils/term.utils.js";

/**
 * Cifras del fondo rotatorio (DEC-103), calculadas y nunca guardadas. Sin
 * acceso a datos: las comparten la pantalla, el reporte y los tests, que las
 * comprueban con el cuadro "Control de pagos" de la obra FLOR - ETAPA 4.
 *
 * Por tipo de movimiento:
 * - Acta normal (NORMAL): `value` es el total de las facturas de su
 *   extracto (lo pone quien llama) y se amortiza completo.
 * - Acta especial (SPECIAL): la fiducia paga `value` (sus facturas) directo
 *   a los proveedores; la constructora cobra `withholding` (retención). Valor
 *   del acta = value + withholding. Se amortiza `amortization`, escrito a mano.
 * - Abono (PAYMENT): entrega `value` al fondo; puede pagar un acta.
 *
 * Saldo del fondo = Σ abonos − Σ amortizaciones (puede ser negativo: se le
 * debe a la constructora más de lo entregado). Lo que se le debe a la
 * constructora = Σ (amortización de cada acta − el abono que la paga).
 */
export const FUND_MOVEMENT_TYPES = Object.freeze({ NORMAL: "NORMAL", SPECIAL: "SPECIAL", PAYMENT: "PAYMENT" });

export const FUND_MOVEMENT_TYPE_NAMES = Object.freeze({
  NORMAL: "Acta",
  SPECIAL: "Acta especial",
  PAYMENT: "Abono",
});

// La letra del cuadro de Intervé: A (acta), E (especial), F (abono al fondo).
export const FUND_MOVEMENT_TYPE_LETTERS = Object.freeze({ NORMAL: "A", SPECIAL: "E", PAYMENT: "F" });

export const isAct = (type) => type === FUND_MOVEMENT_TYPES.NORMAL || type === FUND_MOVEMENT_TYPES.SPECIAL;

/** Lo que el acta amortiza al fondo; un abono no amortiza. */
export const amortizationOf = (m) => {
  if (m.type === FUND_MOVEMENT_TYPES.NORMAL) return decimal(m.value);
  if (m.type === FUND_MOVEMENT_TYPES.SPECIAL) return decimal(m.amortization);
  return decimal(0);
};

/** Valor del acta (la normal, el suyo; la especial, pagos + retención); un abono no tiene. */
export const actValueOf = (m) => {
  if (m.type === FUND_MOVEMENT_TYPES.NORMAL) return decimal(m.value);
  if (m.type === FUND_MOVEMENT_TYPES.SPECIAL) return decimal(m.value).plus(decimal(m.withholding));
  return null;
};

/** Lo que sale de la fiducia: el abono, o lo pagado directo a proveedores en un acta especial. */
const fiduciaryOf = (m) => (m.type === FUND_MOVEMENT_TYPES.NORMAL ? null : decimal(m.value));

/**
 * Fecha que ubica el movimiento en el cuadro: la de su factura más reciente
 * si quien llama la pone (`rowDate`, el acta), o la de su aprobación.
 */
const rowDateOf = (m) => dateOnlyText(m.rowDate ?? m.approvalDate);

/** Mes del movimiento, "AAAA-MM". */
export const monthOf = (m) => rowDateOf(m).slice(0, 7);

/** Orden del cuadro: por su fecha, luego la de aprobación, la del documento y el registro. */
const byDate = (a, b) =>
  rowDateOf(a).localeCompare(rowDateOf(b)) ||
  dateOnlyText(a.approvalDate).localeCompare(dateOnlyText(b.approvalDate)) ||
  dateOnlyText(a.documentDate).localeCompare(dateOnlyText(b.documentDate)) ||
  a.fmvId - b.fmvId;

const sumOf = (values) => sumMoney(values.filter((v) => v !== null && v !== undefined));

/**
 * Movimientos con sus cifras, los totales y el resumen por mes.
 * `movements`: `{ fmvId, type, number, documentDate, approvalDate, value,
 * withholding, amortization, paidId }` (importes como texto o Decimal) de los
 * no eliminados de un fondo. `limit`: el tope del fondo.
 */
export const fundFigures = (movements, limit) => {
  const sorted = [...movements].sort(byDate);
  const payments = sorted.filter((m) => m.type === FUND_MOVEMENT_TYPES.PAYMENT);
  const paymentOf = new Map(payments.filter((p) => p.paidId).map((p) => [Number(p.paidId), p]));
  const actById = new Map(sorted.filter((m) => isAct(m.type)).map((m) => [m.fmvId, m]));

  let balance = decimal(0);
  const rows = sorted.map((m) => {
    const amortization = amortizationOf(m);
    const fiduciary = fiduciaryOf(m);
    balance = balance.plus(m.type === FUND_MOVEMENT_TYPES.PAYMENT ? decimal(m.value) : 0).minus(amortization);
    const act = isAct(m.type);
    const payment = act ? paymentOf.get(m.fmvId) : null;
    const paidAct = !act && m.paidId ? actById.get(Number(m.paidId)) : null;
    const paidValue = payment ? decimal(payment.value) : decimal(0);
    const owed = act ? amortization.minus(paidValue) : null;
    return {
      ...m,
      month: monthOf(m),
      letter: FUND_MOVEMENT_TYPE_LETTERS[m.type],
      typeName: FUND_MOVEMENT_TYPE_NAMES[m.type],
      fiduciary,
      actValue: actValueOf(m),
      amortization: act ? amortization : null,
      balanceAfter: balance,
      // Acta: el abono que la paga y lo que falta pagarle a la constructora.
      paidById: payment?.fmvId ?? null,
      paidByNumber: payment?.number ?? null,
      owed,
      // Abono: el acta que paga.
      paidNumber: paidAct?.number ?? null,
    };
  });

  const acts = rows.filter((r) => isAct(r.type));
  const specials = rows.filter((r) => r.type === FUND_MOVEMENT_TYPES.SPECIAL);
  const paymentRows = rows.filter((r) => r.type === FUND_MOVEMENT_TYPES.PAYMENT);
  const paymentsTotal = sumOf(paymentRows.map((r) => decimal(r.value)));
  const specialsTotal = sumOf(specials.map((r) => decimal(r.value)));
  const summary = {
    // Sin fondo rotatorio, no hay tope.
    limit: limit === null || limit === undefined ? null : decimal(limit),
    payments: paymentsTotal,
    specialPayments: specialsTotal,
    fiduciary: paymentsTotal.plus(specialsTotal),
    withholdings: sumOf(specials.map((r) => decimal(r.withholding))),
    actsValue: sumOf(acts.map((r) => r.actValue)),
    amortized: sumOf(acts.map((r) => r.amortization)),
    balance,
    owed: sumOf(acts.map((r) => r.owed)),
    actsCount: acts.length,
    paidActs: acts.filter((r) => r.paidById).length,
    paymentsCount: paymentRows.length,
  };

  const byMonth = new Map();
  for (const r of rows) {
    if (!byMonth.has(r.month)) byMonth.set(r.month, []);
    byMonth.get(r.month).push(r);
  }
  const months = [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, own]) => ({
      month,
      count: own.length,
      fiduciary: sumOf(own.map((r) => r.fiduciary)),
      withholdings: sumOf(own.map((r) => (r.type === FUND_MOVEMENT_TYPES.SPECIAL ? decimal(r.withholding) : null))),
      actsValue: sumOf(own.map((r) => r.actValue)),
      amortized: sumOf(own.map((r) => r.amortization)),
      payments: sumOf(own.filter((r) => r.type === FUND_MOVEMENT_TYPES.PAYMENT).map((r) => decimal(r.value))),
      closingBalance: own[own.length - 1].balanceAfter,
    }));

  return { rows, summary, months };
};

const MONEY_KEYS = ["value", "withholding", "amortization", "fiduciary", "actValue", "balanceAfter", "owed"];
const SUMMARY_MONEY = ["limit", "payments", "specialPayments", "fiduciary", "withholdings", "actsValue", "amortized", "balance", "owed"];
const MONTH_MONEY = ["fiduciary", "withholdings", "actsValue", "amortized", "payments", "closingBalance"];

const textify = (obj, keys) => ({ ...obj, ...Object.fromEntries(keys.map((k) => [k, moneyText(obj[k])])) });

/** Las cifras con los importes como texto de dos decimales (DEC-028): lo que viaja al cliente. */
export const fundFiguresText = (figures) => ({
  rows: figures.rows.map((r) => textify(r, MONEY_KEYS)),
  summary: textify(figures.summary, SUMMARY_MONEY),
  months: figures.months.map((m) => textify(m, MONTH_MONEY)),
});
