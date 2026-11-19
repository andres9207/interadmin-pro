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
    expect(byNumber("NORMAL", "25")).toMatchObject({
      letter: "A",
      fiduciary: null,
      actValue: "288980846.00",
      amortization: "288980846.00",
    });
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

// Febrero a mayo del mismo cuadro: la diferencia entre cada acta y el abono que
// la paga. El abono paga lo que el acta amortiza, no su valor: en la especial
// (E), lo que la fiducia pagó directo a los proveedores no se le debe a nadie.
const APRIL_MAY = [
  movement(1, "NORMAL", "01", "2026-02-15", "2026-02-16", "89072002.00"),
  movement(2, "NORMAL", "02", "2026-04-17", "2026-04-18", "65564532.00"),
  movement(11, "PAYMENT", "01", "2026-04-22", "2026-04-22", "89072002.00", { paidId: 1 }),
  movement(12, "PAYMENT", "02", "2026-04-22", "2026-04-22", "65564532.00", { paidId: 2 }),
  movement(13, "PAYMENT", "03", "2026-04-29", "2026-04-29", "1000000000.00"),
  movement(3, "NORMAL", "03", "2026-04-29", "2026-05-11", "217577.00"),
  movement(4, "SPECIAL", "04", "2026-05-05", "2026-05-11", "14947968.00", { withholding: "273271.00", amortization: "273271.00" }),
  movement(5, "NORMAL", "05", "2026-05-06", "2026-05-11", "54968410.00"),
  movement(14, "PAYMENT", "04", "2026-05-20", "2026-05-20", "217577.00", { paidId: 3 }),
  movement(15, "PAYMENT", "05", "2026-05-20", "2026-05-20", "273271.00", { paidId: 4 }),
  movement(16, "PAYMENT", "06", "2026-05-20", "2026-05-20", "54968410.00", { paidId: 5 }),
  movement(6, "NORMAL", "06", "2026-05-21", "2026-05-22", "44063696.00"),
];

describe("acta frente a abono, febrero a mayo de FLOR - ETAPA 4", () => {
  const figures = fundFiguresText(fundFigures(APRIL_MAY, "1000000000.00"));
  const row = (type, number) => figures.rows.find((r) => (type === "PAYMENT") === (r.type === "PAYMENT") && r.number === number);

  it("el saldo pasa por negativo, cero y el tope, como el cuadro", () => {
    expect(figures.rows.map((r) => [r.letter, r.number, r.balanceAfter])).toEqual([
      ["A", "01", "-89072002.00"],
      ["A", "02", "-154636534.00"],
      ["F", "01", "-65564532.00"],
      ["F", "02", "0.00"],
      ["F", "03", "1000000000.00"],
      ["A", "03", "999782423.00"],
      ["E", "04", "999509152.00"],
      ["A", "05", "944540742.00"],
      ["F", "04", "944758319.00"],
      ["F", "05", "945031590.00"],
      ["F", "06", "1000000000.00"],
      ["A", "06", "955936304.00"],
    ]);
  });

  it("cada acta pagada: amortización − abono = 0", () => {
    // Acta → abono que la paga: el número del abono no es el del acta.
    const pairs = [
      ["01", "01"],
      ["02", "02"],
      ["03", "04"],
      ["04", "05"],
      ["05", "06"],
    ];
    for (const [act, payment] of pairs) {
      const r = row("ACT", act);
      expect([act, r.paidByNumber, r.amortization, row("PAYMENT", payment).value, r.owed]).toEqual([
        act,
        payment,
        r.amortization,
        r.amortization,
        "0.00",
      ]);
    }
  });

  it("la especial: el abono paga la amortización (273.271), no el valor del acta (15.221.239)", () => {
    expect(row("ACT", "04")).toMatchObject({ actValue: "15221239.00", fiduciary: "14947968.00", amortization: "273271.00", owed: "0.00" });
    expect(row("PAYMENT", "05")).toMatchObject({ value: "273271.00", paidNumber: "04" });
  });

  it("el acta sin abono es lo que se le debe a la constructora; el abono sin acta es la entrega al fondo", () => {
    expect(row("ACT", "06")).toMatchObject({ paidByNumber: null, owed: "44063696.00" });
    expect(row("PAYMENT", "03")).toMatchObject({ paidNumber: null });
    expect(figures.summary).toMatchObject({ owed: "44063696.00", balance: "955936304.00" });
  });

  it("con el mes de la fecha acta, el acta 03 (aprobada el 11/05) va en abril, como el cuadro", () => {
    const byActDate = fundFiguresText(
      fundFigures(
        APRIL_MAY.map((m) => ({ ...m, rowDate: m.documentDate })),
        "1000000000.00",
      ),
    );
    expect(byActDate.rows.find((r) => r.type === "NORMAL" && r.number === "03").month).toBe("2026-04");
    expect(byActDate.months.find((m) => m.month === "2026-04").actsValue).toBe("65782109.00");
    expect(byActDate.months.find((m) => m.month === "2026-05").actsValue).toBe("114253345.00");
  });
});
