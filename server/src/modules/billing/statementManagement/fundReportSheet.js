import { excelMoney } from "../../../common/services/export.service.js";
import { FUND_MOVEMENT_TYPES } from "./fundFigures.js";

/**
 * El Excel del control de pagos de Gerencia extractos (DEC-103), dibujado
 * igual que la tabla de la pantalla (`FundTable.jsx`): las cifras de arriba,
 * la leyenda, las mismas columnas, una fila por mes con sus actas, extractos
 * por aprobar y abonos debajo (agrupadas, para plegarlas como en la pantalla),
 * el mes y el acumulado en una celda combinada, los mismos colores y la fila
 * de total. Solo presenta: las cifras llegan calculadas de `getScopeReport`.
 */

// Colores de la pantalla en el tema claro (los alpha del tema, ya mezclados con el blanco).
const COLORS = {
  border: "FFE3E8EF",
  label: "FF697586",
  payment: "FFE4E6E9",
  // Los del cuadro de Intervé: actas pagadas (con abono) y actas amortizadas al fondo.
  paid: "FFC4BD97",
  amortized: "FFDDD9C3",
  pending: "FFFFFDF5",
  month: "FFF2F9FE",
  light: "FFE4F2FE",
  fiduciary: "FF4B5565",
  balance: "FF5E35B1",
  warning: "FFFFC107",
  error: "FFF44336",
  white: "FFFFFFFF",
};

const HEADERS = [
  "Mes",
  "Acta N°",
  "Fecha acta",
  "Fecha aprob.",
  "",
  "Fondo rotat. (F) especiales (E) actas (A)",
  "Retenc. pagos espec.",
  "Valor actas",
  "Amortización fondo",
  "Saldo fondo rotatorio",
  "Acumulado mensual actas",
  "Glosa",
  "Valor",
];
const WIDTHS = [10, 11, 11, 11, 5, 17, 14, 15, 15, 15, 15, 20, 13];
const COLS = HEADERS.length;
// Columnas por número (1 = A).
const C = {
  month: 1,
  number: 2,
  documentDate: 3,
  approvalDate: 4,
  letter: 5,
  fiduciary: 6,
  withholding: 7,
  actValue: 8,
  amortization: 9,
  balance: 10,
  accumulated: 11,
  gloss: 12,
  glossValue: 13,
};

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
/** "2026-10" → "oct-26", como el cuadro. */
const monthLabel = (month) => `${MONTHS[Number(month.slice(5, 7)) - 1]}-${month.slice(2, 4)}`;

/** Número de un solo dígito con un cero a la izquierda: "2" → "02". */
const padNumber = (value) => {
  const text = String(value ?? "");
  return /^\d$/.test(text) ? `0${text}` : text;
};

const isAct = (row) => row.type !== FUND_MOVEMENT_TYPES.PAYMENT;
const rowLabel = (row) => `${isAct(row) ? "Acta" : "Abono"} ${padNumber(row.number)}`;
const dateOf = (value) => String(value ?? "").slice(0, 10);

/** "2026-11-17" → fecha de celda (UTC, sin corrimiento de zona). */
const dateCell = (value) => (dateOf(value) ? new Date(`${dateOf(value)}T00:00:00Z`) : null);

const fill = (argb) => ({ type: "pattern", pattern: "solid", fgColor: { argb } });
const THIN = { style: "thin", color: { argb: COLORS.border } };
const BORDER = { top: THIN, left: THIN, bottom: THIN, right: THIN };

// Pesos sin decimales cuando son cero, como la pantalla; con centavos, con dos.
const moneyFormat = (text) => (/\.\d*[1-9]/.test(String(text)) ? '"$" #,##0.00' : '"$" #,##0');

/** "-1838000.50" → "$ -1.838.000,50", y sin ",00" si no tiene centavos; solo texto. */
const displayMoney = (text) => {
  const [integer, decimals = "00"] = String(text).split(".");
  // eslint-disable-next-line sonarjs/super-linear-regex -- dígitos de un importe del servidor, cortos (DEC-099)
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const cents = /^0*$/.test(decimals) ? "" : "," + decimals.padEnd(2, "0");
  return `$ ${grouped}${cents}`;
};

/** Escribe un importe (texto de money.utils) en la celda, en rojo si es negativo. */
const setMoney = (cell, text, { bold = false, color } = {}) => {
  const value = excelMoney(text);
  if (value === null) return;
  cell.value = value;
  cell.numFmt = moneyFormat(text);
  cell.alignment = { horizontal: "right", vertical: "middle" };
  const negative = String(text).startsWith("-");
  cell.font = { size: 9, bold, color: { argb: color ?? (negative ? COLORS.error : "FF000000") } };
};

const setDate = (cell, value) => {
  const date = dateCell(value);
  if (!date) return;
  cell.value = date;
  cell.numFmt = "dd/mm/yy";
  cell.alignment = { horizontal: "left", vertical: "middle" };
};

/** Una fila de la tabla: bordes, letra chica y el fondo de la fila. */
const tableRow = (sheet, bg) => {
  const row = sheet.addRow([]);
  for (let col = 1; col <= COLS; col += 1) {
    const cell = row.getCell(col);
    cell.border = BORDER;
    cell.font = { size: 9 };
    cell.alignment = { vertical: "middle" };
    if (bg) cell.fill = fill(bg);
  }
  return row;
};

// ─── Cifras de arriba ────────────────────────────────────────────────────────

/** Las tarjetas de la pantalla, cuatro por fila, cada una en un bloque combinado. */
const SPANS = [
  [1, 3],
  [4, 6],
  [7, 10],
  [11, 13],
];

const addFigures = (sheet, figures) => {
  for (let i = 0; i < figures.length; i += 4) {
    const group = figures.slice(i, i + 4);
    const labelRow = sheet.addRow([]);
    const valueRow = sheet.addRow([]);
    const hintRow = sheet.addRow([]);
    valueRow.height = 20;
    group.forEach((figure, j) => {
      const [from, to] = SPANS[j];
      [labelRow, valueRow, hintRow].forEach((row) => sheet.mergeCells(row.number, from, row.number, to));
      const label = labelRow.getCell(from);
      label.value = figure.label;
      label.font = { size: 9, color: { argb: COLORS.label } };
      const value = valueRow.getCell(from);
      if (figure.money) {
        setMoney(value, figure.value, { bold: true });
        value.numFmt = '"$" #,##0.00';
        value.font = { ...value.font, size: 12 };
        value.alignment = { horizontal: "left", vertical: "middle" };
      } else {
        value.value = figure.value;
        value.font = { bold: true, size: 12 };
      }
      const hint = hintRow.getCell(from);
      hint.value = figure.hint ?? "";
      hint.font = { size: 8, color: { argb: COLORS.label } };
      // Borde de la tarjeta: arriba, a los lados y abajo.
      for (let col = from; col <= to; col += 1) {
        labelRow.getCell(col).border = { top: THIN, left: col === from ? THIN : undefined, right: col === to ? THIN : undefined };
        valueRow.getCell(col).border = { left: col === from ? THIN : undefined, right: col === to ? THIN : undefined };
        hintRow.getCell(col).border = { bottom: THIN, left: col === from ? THIN : undefined, right: col === to ? THIN : undefined };
      }
    });
    sheet.addRow([]);
  }
};

const figuresOf = ({ fund, summary, pending }) => {
  const figures = [
    {
      label: "Lo que lleva la obra (acumulado de actas)",
      value: summary.extractsValue,
      money: true,
      hint: `${summary.actsCount} acta(s) aprobada(s) · ${pending.length} por aprobar`,
    },
    {
      label: "Se le debe a la constructora",
      value: summary.owed,
      money: true,
      hint: `${summary.actsCount - summary.paidActs} acta(s) sin abono`,
    },
    { label: "Saldo del fondo rotatorio", value: summary.balance, money: true, hint: "Abonos − amortizaciones" },
    fund
      ? { label: "Tope del fondo", value: summary.limit, money: true, hint: fund.description ?? "" }
      : { label: "Tope del fondo", value: "Sin fondo", hint: "Créalo para registrar abonos" },
  ];
  if (!fund) return figures;
  return [
    ...figures,
    { label: "Total abonos al fondo", value: summary.payments, money: true, hint: `${summary.paymentsCount} abono(s)` },
    { label: "Total pagos actas especiales", value: summary.specialPayments, money: true },
    { label: "Total pagos por la fiducia", value: summary.fiduciary, money: true, hint: "Abonos + pagos especiales" },
    { label: "Actas que amortizan el fondo", value: summary.amortized, money: true },
  ];
};

// ─── Título, leyenda y encabezado ────────────────────────────────────────────

const addTitleAndLegend = (sheet) => {
  const row = sheet.addRow([]);
  row.height = 18;
  row.getCell(1).value = "Control de pagos";
  row.getCell(1).font = { bold: true, size: 11 };
  const legend = [
    { from: 6, to: 8, text: "Por aprobar: llena sus campos en la fila", bg: COLORS.pending },
    { from: 9, to: 10, text: "Actas pagadas", bg: COLORS.paid },
    { from: 11, to: 11, text: "Abono", bg: COLORS.payment },
    { from: 12, to: 13, text: "A acta · E especial · F abono" },
  ];
  for (const item of legend) {
    if (item.to > item.from) sheet.mergeCells(row.number, item.from, row.number, item.to);
    const cell = row.getCell(item.from);
    cell.value = item.text;
    cell.font = { size: 8 };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    if (item.bg) cell.fill = fill(item.bg);
    for (let col = item.from; col <= item.to; col += 1) row.getCell(col).border = BORDER;
  }
};

const addHeader = (sheet) => {
  const row = sheet.addRow(HEADERS.map((h) => h.toUpperCase()));
  row.height = 42;
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { bold: true, size: 9 };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = BORDER;
  });
  row.getCell(C.letter).note = "A acta · E especial · F abono";
};

// ─── Filas ───────────────────────────────────────────────────────────────────

/** La fila del mes: lo pagado por la fiducia y el acumulado mensual de las actas. */
const addMonthRow = (sheet, m) => {
  const row = tableRow(sheet, COLORS.month);
  row.getCell(C.month).value = monthLabel(m.month);
  row.getCell(C.month).font = { size: 9, bold: true };
  sheet.mergeCells(row.number, C.number, row.number, C.letter);
  if (m.pendingCount > 0) {
    row.getCell(C.number).value = `${m.pendingCount} por aprobar`;
    row.getCell(C.number).font = { size: 9, bold: true, color: { argb: COLORS.warning } };
  }
  setMoney(row.getCell(C.fiduciary), m.fiduciary, { bold: true });
  sheet.mergeCells(row.number, C.withholding, row.number, C.balance);
  setMoney(row.getCell(C.accumulated), m.extractsValue, { bold: true });
  sheet.mergeCells(row.number, C.gloss, row.number, C.glossValue);
};

/** Un acta o un abono ya registrados. */
const addMovementRow = (sheet, r) => {
  const act = isAct(r);
  const row = tableRow(sheet, act ? null : COLORS.payment);
  row.getCell(C.number).value = rowLabel(r);
  setDate(row.getCell(C.documentDate), r.documentDate);
  setDate(row.getCell(C.approvalDate), r.approvalDate);
  row.getCell(C.letter).value = r.letter;
  row.getCell(C.letter).alignment = { horizontal: "center", vertical: "middle" };
  setMoney(row.getCell(C.fiduciary), r.fiduciary);
  setMoney(row.getCell(C.withholding), r.withholding);
  setMoney(row.getCell(C.actValue), r.actValue);
  setMoney(row.getCell(C.amortization), r.amortization);
  if (act) row.getCell(C.amortization).fill = fill(r.paidById ? COLORS.paid : COLORS.amortized);
  setMoney(row.getCell(C.balance), r.balanceAfter);
  const glosses = r.glosses?.items ?? [];
  if (glosses.length) {
    const gloss = row.getCell(C.gloss);
    gloss.value = glosses.map((g) => `Glosa ${g.statement ?? ""} ${g.state}`.replace(/\s+/g, " ")).join("\n");
    gloss.alignment = { vertical: "middle", wrapText: true };
    const value = row.getCell(C.glossValue);
    if (glosses.length === 1) setMoney(value, glosses[0].value);
    else {
      // Varios valores en una celda: como texto, uno por línea, con el formato de la pantalla.
      value.value = glosses.map((g) => displayMoney(g.value)).join("\n");
      value.alignment = { horizontal: "right", vertical: "middle", wrapText: true };
    }
  }
};

/** Un extracto que todavía no es acta: con lo que la pantalla le propone (acta A). */
const addPendingRow = (sheet, p) => {
  const row = tableRow(sheet, COLORS.pending);
  row.getCell(C.number).value = `Acta ${padNumber(p.number)}`;
  row.getCell(C.number).note = `Extracto ${p.number} · ${p.invoicesCount} factura(s), por aprobar como acta`;
  setDate(row.getCell(C.documentDate), p.lastDate);
  setDate(row.getCell(C.approvalDate), p.approvalDate);
  row.getCell(C.letter).value = "A";
  row.getCell(C.letter).alignment = { horizontal: "center", vertical: "middle" };
  setMoney(row.getCell(C.actValue), p.total);
  setMoney(row.getCell(C.amortization), p.total);
};

/** Las filas de un mes en orden: actas y extractos por su factura más reciente, abonos por su aprobación. */
const monthRows = (month, movements, pending) =>
  [
    ...movements.filter((r) => r.month === month).map((r) => ({ kind: "movement", date: dateOf(r.rowDate ?? r.approvalDate), row: r })),
    ...pending.filter((p) => p.month === month).map((p) => ({ kind: "pending", date: dateOf(p.lastDate), row: p })),
  ].sort((a, b) => a.date.localeCompare(b.date));

const addTotalRow = (sheet, summary) => {
  const row = tableRow(sheet, null);
  sheet.mergeCells(row.number, 1, row.number, C.letter);
  row.getCell(1).value = "Total";
  row.getCell(1).font = { size: 9, bold: true };
  const total = (col, text, bg, color) => {
    const cell = row.getCell(col);
    setMoney(cell, text ?? "0.00", { bold: true, color });
    if (bg) cell.fill = fill(bg);
  };
  total(C.fiduciary, summary.fiduciary, COLORS.fiduciary, COLORS.white);
  total(C.withholding, summary.withholdings);
  total(C.actValue, summary.extractsValue, COLORS.light);
  total(C.amortization, summary.amortized, COLORS.amortized);
  total(C.balance, summary.balance, COLORS.balance, COLORS.white);
  total(C.accumulated, summary.extractsValue, COLORS.light);
  sheet.mergeCells(row.number, C.gloss, row.number, C.glossValue);
  for (let col = 1; col <= COLS; col += 1) row.getCell(col).border = { ...BORDER, top: { style: "medium", color: { argb: "FF000000" } } };
};

/** Debajo de la tabla, como el cuadro de Intervé: el color y lo que significa. */
const addColorLegend = (sheet) => {
  sheet.addRow([]);
  for (const [bg, text] of [
    [COLORS.paid, "ACTAS PAGADAS"],
    [COLORS.amortized, "ACTAS AMORTIZADAS AL FONDO"],
  ]) {
    const row = sheet.addRow([]);
    sheet.mergeCells(row.number, 1, row.number, 2);
    row.getCell(1).fill = fill(bg);
    row.getCell(3).value = text;
    row.getCell(3).font = { size: 9 };
  }
};

/**
 * Dibuja el control de pagos en la hoja. `report`: lo que devuelve
 * `getScopeReport` (`fund`, `summary`, `months`, `movements`, `pending`).
 */
export const drawFundSheet = (sheet, report) => {
  const { months, movements, pending, summary } = report;
  WIDTHS.forEach((width, i) => (sheet.getColumn(i + 1).width = width));

  addFigures(sheet, figuresOf(report));
  addTitleAndLegend(sheet);
  addHeader(sheet);

  if (months.length === 0) {
    const row = sheet.addRow(["Todavía no hay extractos ni abonos."]);
    sheet.mergeCells(row.number, 1, row.number, COLS);
    row.getCell(1).font = { italic: true, size: 9 };
    row.getCell(1).alignment = { horizontal: "center" };
    return;
  }

  // Las filas de cada mes quedan agrupadas bajo su fila de mes: se pliegan con el botón del margen.
  sheet.properties.outlineProperties = { summaryBelow: false };
  for (const m of months) {
    addMonthRow(sheet, m);
    const items = monthRows(m.month, movements, pending);
    const first = sheet.rowCount + 1;
    for (const item of items) {
      if (item.kind === "pending") addPendingRow(sheet, item.row);
      else addMovementRow(sheet, item.row);
      sheet.getRow(sheet.rowCount).outlineLevel = 1;
    }
    // Mes y acumulado: una sola celda por mes, como la pantalla.
    const last = sheet.rowCount;
    if (last > first) {
      sheet.mergeCells(first, C.month, last, C.month);
      sheet.mergeCells(first, C.accumulated, last, C.accumulated);
    }
  }
  addTotalRow(sheet, summary);
  addColorLegend(sheet);
};
