import { fundFigures, fundFiguresText } from "../../../../src/modules/billing/statementManagement/fundFigures.js";

// Cifras del fondo rotatorio (DEC-103), comprobadas con el mes de octubre del
// cuadro "Control de pagos" de la obra FLOR - ETAPA 4 (constructora Ménsula):
// el fondo llega a octubre con 1.000.000.000 entregados y sin deuda.

const movement = (fmvId, type, number, documentDate, approvalDate, value, extra = {}) => ({
  fmvId,
  type,
  number,
  documentDate,
  approvalDate,
  value,
  withholding: null,
  amortization: null,
  paidId: null,
  ...extra,
});

const OCTOBER = [
  // El saldo con que llega a octubre: la entrega del fondo completo.
  movement(1, "PAYMENT", "19", "2026-09-30", "2026-09-30", "1000000000"),
  movement(2, "NORMAL", "25", "2026-10-05", "2026-10-07", "288980846"),
  movement(3, "NORMAL", "26", "2026-10-06", "2026-10-09", "19259929"),
  movement(4, "PAYMENT", "20", "2026-10-14", "2026-10-14", "288980846", { paidId: 2 }),
  movement(5, "PAYMENT", "21", "2026-10-14", "2026-10-14", "19259929", { paidId: 3 }),
  movement(6, "SPECIAL", "27", "2026-10-19", "2026-10-20", "35856298", { withholding: "1113231", amortization: "13858108" }),
];

const text = (movements, limit = "1000000000") => fundFiguresText(fundFigures(movements, limit));

describe("cuadro de octubre de FLOR - ETAPA 4", () => {
  const { rows, summary, months } = text(OCTOBER);
  const byNumber = (type, number) => rows.find((r) => r.number === number && (type === "PAYMENT") === (r.type === "PAYMENT"));

  it("el saldo del fondo después de cada movimiento", () => {
    expect(rows.map((r) => r.balanceAfter)).toEqual([
      "1000000000.00",
      "711019154.00",
      "691759225.00",
      "980740071.00",
      "1000000000.00",
      "986141892.00",
    ]);
  });

  it("el acta especial vale los pagos más la retención y amortiza lo escrito", () => {
    expect(byNumber("SPECIAL", "27")).toMatchObject({
      letter: "E",
      fiduciary: "35856298.00",
      withholding: "1113231.00",
      actValue: "36969529.00",
      amortization: "13858108.00",
    });
  });

  it("el acta normal amortiza su valor completo y sale de la fiducia nada", () => {
    expect(byNumber("NORMAL", "25")).toMatchObject({ letter: "A", fiduciary: null, actValue: "288980846.00", amortization: "288980846.00" });
  });

  it("cada acta sabe qué abono la paga, y cada abono qué acta paga", () => {
    expect(byNumber("NORMAL", "25")).toMatchObject({ paidByNumber: "20", owed: "0.00" });
    expect(byNumber("NORMAL", "26")).toMatchObject({ paidByNumber: "21", owed: "0.00" });
    expect(byNumber("SPECIAL", "27")).toMatchObject({ paidByNumber: null, owed: "13858108.00" });
    expect(byNumber("PAYMENT", "20")).toMatchObject({ letter: "F", paidNumber: "25", amortization: null, actValue: null });
    expect(byNumber("PAYMENT", "19")).toMatchObject({ paidNumber: null });
  });

  it("el mes de octubre: acumulado de actas y lo que salió de la fiducia", () => {
    const october = months.find((m) => m.month === "2026-10");
    expect(october).toMatchObject({
      count: 5,
      actsValue: "345210304.00",
      fiduciary: "344097073.00",
      withholdings: "1113231.00",
      closingBalance: "986141892.00",
    });
    expect(months.map((m) => m.month)).toEqual(["2026-09", "2026-10"]);
  });

  it("el resumen: saldo, lo que se le debe a la constructora y el tope", () => {
    expect(summary).toMatchObject({
      limit: "1000000000.00",
      balance: "986141892.00",
      owed: "13858108.00",
      amortized: "322098883.00",
      actsValue: "345210304.00",
      payments: "1308240775.00",
      specialPayments: "35856298.00",
      fiduciary: "1344097073.00",
      actsCount: 3,
      paidActs: 2,
      paymentsCount: 3,
    });
  });
});

describe("saldo negativo y orden", () => {
  it("sin entregar plata, las actas dejan el fondo en negativo (se le debe a la constructora)", () => {
    // Los extractos 1 y 2 del cuadro: 89.072.002 y 65.782.109, sin ningún abono.
    const { summary, rows } = text([
      movement(1, "NORMAL", "1", "2026-02-25", "2026-04-18", "89072002"),
      movement(2, "NORMAL", "2", "2026-04-17", "2026-04-18", "65782109"),
    ]);
    expect(rows.map((r) => r.balanceAfter)).toEqual(["-89072002.00", "-154854111.00"]);
    expect(summary).toMatchObject({ balance: "-154854111.00", owed: "154854111.00" });
  });

  it("ordena por fecha de aprobación, luego la del documento y luego el registro", () => {
    const { rows } = text([
      movement(3, "NORMAL", "3", "2026-05-01", "2026-05-02", "10"),
      movement(2, "NORMAL", "2", "2026-04-01", "2026-05-02", "10"),
      movement(1, "NORMAL", "1", "2026-04-01", "2026-05-03", "10"),
    ]);
    expect(rows.map((r) => r.number)).toEqual(["2", "3", "1"]);
  });

  it("un fondo sin movimientos: todo en cero", () => {
    const { summary, months, rows } = text([], "500");
    expect(rows).toEqual([]);
    expect(months).toEqual([]);
    expect(summary).toMatchObject({ limit: "500.00", balance: "0.00", owed: "0.00", actsValue: "0.00" });
  });
});
