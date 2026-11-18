import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Gerencia extractos (DEC-103): el acta es el extracto (su valor sale de sus
// facturas, por etapa), se ve con o sin fondo; el fondo agrega el tope y los
// abonos (uno por acta, sin superar lo que amortiza); alcance por obra,
// bloqueo de la obra y bitácora.

const state = {};

const prismaMock = {
  tbl_works: { findUnique: jest.fn(async () => state.work), findFirst: jest.fn(async () => state.workRow) },
  tbl_work_stages: { findFirst: jest.fn(async () => state.stage), findMany: jest.fn(async () => state.stages) },
  tbl_rotating_funds: {
    findUnique: jest.fn(async ({ where }) => (where.rfd_idempotency_key ? null : state.fund)),
    findFirst: jest.fn(async () => state.scopeFund),
    findMany: jest.fn(async () => state.funds),
    create: jest.fn(async () => ({ rfd_id: 70 })),
    update: jest.fn(),
  },
  tbl_fund_movements: {
    findUnique: jest.fn(async ({ where }) => (where.fmv_idempotency_key ? null : state.movement)),
    // Según lo que se busca: el número repetido, el abono que paga un acta o el acta que paga un abono.
    findFirst: jest.fn(async ({ where }) => {
      if (where.fmv_number) return state.duplicateNumber;
      if (where.fmv_paid_id) return state.paymentOfAct;
      return state.act;
    }),
    findMany: jest.fn(async () => state.movements),
    count: jest.fn(async () => state.paymentsCount),
    create: jest.fn(async () => ({ fmv_id: 90 })),
    update: jest.fn(),
  },
  tbl_invoices: { count: jest.fn(async () => state.extractInvoices) },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({
  workStatementInvoices: jest.fn(async () => state.invoices),
}));
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoiceGlosses.service.js", () => ({
  statementsGlosses: jest.fn(async () => state.glosses),
}));

const service = await import("../../../../src/modules/billing/statementManagement/statementManagement.service.js");

const KEY = "3f2b8c1e-5d4a-4e6b-9a7c-1b2d3e4f5a6b";
const ctx = { useId: 9, ip: "1.1.1.1" };
const OWN = Object.freeze({ all: false, wrkId: 8 });
const OTHER = Object.freeze({ all: false, wrkId: 5 });
const auditRows = () => prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
const lockedTables = () => prismaMock.$queryRaw.mock.calls.map((call) => call.slice(1).map((v) => v?.strings?.join("") ?? "").join(" "));

const invoice = (overrides = {}) => ({
  invId: 1,
  pvtId: 3,
  number: "F-1",
  providerName: "Ferretería",
  menuName: "Simple",
  contractNumber: null,
  date: "2026-10-01",
  voucherNumber: null,
  statement: "25",
  wksId: 4,
  total: "100.00",
  value: "90.00",
  state: "APPROVED",
  stateName: "Aprobada",
  ...overrides,
});

const movementRow = (overrides = {}) => ({
  fmv_id: 90,
  wrk_id: 8,
  wks_id: 4,
  fmv_type: "NORMAL",
  fmv_number: "25",
  fmv_document_date: new Date("2026-10-05T00:00:00Z"),
  fmv_approval_date: new Date("2026-10-07T00:00:00Z"),
  fmv_value: null,
  fmv_withholding: null,
  fmv_amortization: null,
  fmv_paid_id: null,
  fmv_description: null,
  sta_id: 1,
  ...overrides,
});

const actInput = (overrides = {}) => ({ wrkId: 8, wksId: 4, type: "NORMAL", number: " 25 ", documentDate: "2026-10-05", approvalDate: "2026-10-07", ...overrides });
const paymentInput = (overrides = {}) =>
  actInput({ type: "PAYMENT", number: "20", documentDate: "2026-10-14", approvalDate: "2026-10-14", value: "100", paidId: 88, ...overrides });

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  Object.assign(state, {
    work: { sta_id: 1 },
    workRow: { wrk_id: 8, wrk_code: "FLOR", wrk_name: "Flor de loto", tbl_construction_companies: { cnc_description: "Ménsula" } },
    stage: { sta_id: 1 },
    stages: [{ wks_id: 4, wks_name: "Etapa 4", sta_id: 1 }],
    fund: { rfd_id: 70, wrk_id: 8, wks_id: 4, rfd_limit: "1000000000.00", rfd_description: null, sta_id: 1 },
    scopeFund: null,
    funds: [],
    movement: movementRow(),
    movements: [],
    invoices: [],
    paymentsCount: 0,
    duplicateNumber: null,
    act: null,
    paymentOfAct: null,
    extractInvoices: 2,
    glosses: [],
  });
});

describe("cuadro por obra y etapa", () => {
  it("sin fondo, muestra los extractos de la etapa por aprobar con el total de sus facturas (sin las anuladas)", async () => {
    state.invoices = [
      invoice({ invId: 1, statement: "25", total: "100.00" }),
      invoice({ invId: 2, statement: "25", total: "50.00", state: "REGISTERED" }),
      invoice({ invId: 3, statement: "25", total: "999.00", state: "CANCELLED" }),
      invoice({ invId: 4, statement: "26", wksId: null, total: "7.00" }),
    ];
    const report = await service.getScopeReport({ wrkId: 8, wksId: 4, scope: OWN });
    expect(report.fund).toBeNull();
    expect(report.summary.limit).toBeNull();
    expect(report.pending).toEqual([expect.objectContaining({ number: "25", invoicesCount: 3, registered: 1, total: "150.00" })]);
    expect(report.pending[0].invoices).toHaveLength(3);
  });

  it("el acta aprobada toma su valor de sus facturas (sin distinguir mayúsculas) y sale de los pendientes", async () => {
    state.invoices = [invoice({ statement: "ext-25", total: "288980846.00" }), invoice({ invId: 2, statement: "EXT-25", total: null, value: "10.00" })];
    state.movements = [movementRow({ fmv_number: "Ext-25" })];
    state.funds = [{ ...state.fund, updated_by_user: null }];
    const report = await service.getScopeReport({ wrkId: 8, wksId: 4, scope: OWN });
    expect(report.pending).toEqual([]);
    expect(report.movements[0]).toMatchObject({ actValue: "288980856.00", amortization: "288980856.00", owed: "288980856.00" });
    expect(report.movements[0].invoices).toHaveLength(2);
    expect(report.summary).toMatchObject({ limit: "1000000000.00", balance: "-288980856.00" });
  });

  it("cada fila va en el mes de la factura más reciente de su extracto, y el mes suma lo aprobado y lo por aprobar", async () => {
    state.invoices = [
      invoice({ invId: 1, statement: "25", date: "2026-10-28", total: "100.00" }),
      invoice({ invId: 2, statement: "26", date: "2026-11-03", total: "40.00" }),
      invoice({ invId: 3, statement: "27", date: "2026-11-10", total: "60.00" }),
    ];
    // El acta 25 se aprueba en noviembre, pero su factura es de octubre.
    state.movements = [movementRow({ fmv_number: "25", fmv_approval_date: new Date("2026-11-20T00:00:00Z") })];
    const report = await service.getScopeReport({ wrkId: 8, wksId: 4, scope: OWN });
    expect(report.movements[0].month).toBe("2026-10");
    expect(report.pending.map((p) => [p.number, p.month])).toEqual([
      ["26", "2026-11"],
      ["27", "2026-11"],
    ]);
    expect(report.months).toEqual([
      expect.objectContaining({ month: "2026-10", actsValue: "100.00", pendingCount: 0, extractsValue: "100.00", closingBalance: "-100.00" }),
      // Noviembre solo tiene extractos por aprobar: cierra con el saldo de octubre.
      expect.objectContaining({ month: "2026-11", actsValue: "0.00", pendingCount: 2, pendingValue: "100.00", extractsValue: "100.00", closingBalance: "-100.00" }),
    ]);
    expect(report.summary).toMatchObject({ actsValue: "100.00", pendingValue: "100.00", extractsValue: "200.00" });
  });

  it("con etapas, las facturas sin etapa van a su propio ámbito", async () => {
    state.invoices = [invoice(), invoice({ invId: 2, wksId: null, statement: "30" })];
    const { scopes } = await service.getManagement({ wrkId: 8, scope: OWN });
    expect(scopes.map((s) => [s.wksId, s.name, s.pendingCount])).toEqual([
      [4, "Etapa 4", 1],
      [null, "Sin etapa", 1],
    ]);
  });

  it("sin etapas, un solo ámbito: la obra completa", async () => {
    state.stages = [];
    const { scopes, work } = await service.getManagement({ wrkId: 8, scope: OWN });
    expect(scopes).toEqual([expect.objectContaining({ wksId: null, name: "Obra completa", fund: null })]);
    expect(work.constructionCompany).toBe("Ménsula");
  });

  it("una obra fuera del alcance no se lee (404)", async () => {
    await expect(service.getScopeReport({ wrkId: 8, wksId: 4, scope: OTHER })).rejects.toMatchObject({ statusCode: 404 });
  });
});

describe("fondo", () => {
  it("crea el fondo de una etapa bloqueando la obra, con la clave y bitácora", async () => {
    await expect(
      service.saveFund({ rfdId: 0, input: { wrkId: 8, wksId: 4, limit: "1000000000" }, useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })
    ).resolves.toEqual({ message: "Fondo rotatorio creado correctamente", rfdId: 70 });
    expect(lockedTables()[0]).toMatch(/tbl_works/);
    expect(prismaMock.tbl_rotating_funds.create.mock.calls[0][0].data).toMatchObject({ wrk_id: 8, wks_id: 4, rfd_idempotency_key: KEY });
    expect(auditRows().find((r) => r.aud_field === "rfd_limit")).toMatchObject({ aud_entity: "FONDO_ROTATORIO", aud_new_value: "1000000000.00" });
  });

  it("una etapa con fondo no recibe otro (409)", async () => {
    state.scopeFund = { rfd_id: 71 };
    await expect(
      service.saveFund({ rfdId: 0, input: { wrkId: 8, wksId: 4, limit: "1" }, useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 409, message: "La etapa ya tiene un fondo rotatorio." });
  });

  it("cambiar el tope bloquea la obra y el fondo y queda en la bitácora", async () => {
    await service.saveFund({ rfdId: 70, input: { limit: "2000000000" }, useBy: 9, scope: OWN, ctx });
    expect(lockedTables().join(" ")).toMatch(/tbl_works.*tbl_rotating_funds/);
    expect(auditRows().find((r) => r.aud_field === "rfd_limit")).toMatchObject({ aud_old_value: "1000000000.00", aud_new_value: "2000000000.00" });
  });

  it("un fondo con abonos no se elimina (409); sin abonos, sí", async () => {
    state.paymentsCount = 2;
    await expect(service.deleteFund({ rfdId: 70, useBy: 9, scope: OWN, ctx })).rejects.toMatchObject({ statusCode: 409 });
    state.paymentsCount = 0;
    await service.deleteFund({ rfdId: 70, useBy: 9, scope: OWN, ctx });
    expect(prismaMock.tbl_rotating_funds.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, rfd_delete_by: 9 });
  });
});

describe("aprobar actas y registrar abonos", () => {
  it("aprueba un extracto como acta normal, sin valor propio, bloqueando la obra", async () => {
    await expect(service.saveFundMovement({ fmvId: 0, input: actInput(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).resolves.toEqual({
      message: "Acta creada correctamente",
      fmvId: 90,
    });
    expect(lockedTables()[0]).toMatch(/tbl_works/);
    expect(prismaMock.tbl_fund_movements.create.mock.calls[0][0].data).toMatchObject({
      wrk_id: 8,
      wks_id: 4,
      fmv_type: "NORMAL",
      fmv_number: "25",
      fmv_value: null,
      fmv_withholding: null,
    });
    expect(prismaMock.tbl_invoices.count.mock.calls[0][0].where).toMatchObject({ wrk_id: 8, inv_statement: "25", inv_state: { not: "CANCELLED" } });
  });

  it("un extracto sin facturas en la etapa no es un acta (409)", async () => {
    state.extractInvoices = 0;
    await expect(service.saveFundMovement({ fmvId: 0, input: actInput(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
    });
    expect(prismaMock.tbl_fund_movements.create).not.toHaveBeenCalled();
  });

  it("el acta especial exige la retención y la amortización (400)", async () => {
    await expect(
      service.saveFundMovement({ fmvId: 0, input: actInput({ type: "SPECIAL", withholding: "1113231" }), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: "La amortización al fondo es requerida." });
  });

  it("un extracto ya aprobado no se aprueba otra vez (409)", async () => {
    state.duplicateNumber = { fmv_id: 91 };
    await expect(service.saveFundMovement({ fmvId: 0, input: actInput(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      message: "El extracto 25 ya es un acta aprobada aquí.",
    });
  });

  it("sin fondo no hay abonos (409)", async () => {
    await expect(
      service.saveFundMovement({ fmvId: 0, input: paymentInput({ paidId: null }), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 409, message: "Para registrar abonos, primero crea el fondo rotatorio de esta obra o etapa." });
  });

  it("el abono no supera lo que amortiza el acta normal: el total de sus facturas", async () => {
    state.scopeFund = { rfd_id: 70 };
    state.act = { wrk_id: 8, wks_id: 4, fmv_type: "NORMAL", fmv_number: "25", fmv_amortization: null };
    state.invoices = [invoice({ total: "60.00" }), invoice({ invId: 2, total: "40.00" }), invoice({ invId: 3, wksId: 9, total: "500.00" })];
    await expect(
      service.saveFundMovement({ fmvId: 0, input: paymentInput({ value: "100.01" }), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })
    ).rejects.toMatchObject({ statusCode: 400, message: "El abono supera lo que el acta 25 amortiza al fondo (100.00)." });
    await service.saveFundMovement({ fmvId: 0, input: paymentInput({ value: "100" }), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY });
    expect(prismaMock.tbl_fund_movements.create.mock.calls[0][0].data).toMatchObject({ fmv_type: "PAYMENT", fmv_paid_id: 88 });
  });

  it("un acta que ya paga otro abono no se paga dos veces (409)", async () => {
    state.scopeFund = { rfd_id: 70 };
    state.act = { wrk_id: 8, wks_id: 4, fmv_type: "SPECIAL", fmv_number: "27", fmv_amortization: "13858108.00" };
    state.paymentOfAct = { fmv_number: "19" };
    await expect(service.saveFundMovement({ fmvId: 0, input: paymentInput(), useBy: 9, scope: OWN, ctx, idempotencyKey: KEY })).rejects.toMatchObject({
      statusCode: 409,
      message: "El acta 27 ya la paga el abono 19.",
    });
  });

  it("al editar un acta, el tipo y el extracto son los guardados", async () => {
    await service.saveFundMovement({ fmvId: 90, input: actInput({ type: "PAYMENT", number: "99", approvalDate: "2026-10-08" }), useBy: 9, scope: OWN, ctx });
    expect(prismaMock.tbl_fund_movements.update.mock.calls[0][0].data).toMatchObject({ fmv_type: "NORMAL", fmv_number: "25", fmv_value: null });
  });

  it("la amortización de un acta especial pagada no baja del abono (409)", async () => {
    state.movement = movementRow({ fmv_type: "SPECIAL", fmv_withholding: "1.00", fmv_amortization: "100.00" });
    state.paymentOfAct = { fmv_number: "20", fmv_value: "100.00" };
    await expect(
      service.saveFundMovement({ fmvId: 90, input: actInput({ type: "SPECIAL", withholding: "1", amortization: "50" }), useBy: 9, scope: OWN, ctx })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("un acta que paga un abono no se elimina (409); sin abono vuelve a los extractos por aprobar", async () => {
    state.paymentOfAct = { fmv_number: "20", fmv_value: "1.00" };
    await expect(service.deleteFundMovement({ fmvId: 90, useBy: 9, scope: OWN, ctx })).rejects.toMatchObject({ statusCode: 409 });
    state.paymentOfAct = null;
    await expect(service.deleteFundMovement({ fmvId: 90, useBy: 9, scope: OWN, ctx })).resolves.toEqual({ message: "Acta eliminada correctamente" });
    expect(prismaMock.tbl_fund_movements.update.mock.calls[0][0].data).toMatchObject({ sta_id: 3, fmv_delete_by: 9 });
  });

  it("un acta de una obra fuera del alcance no se toca (404)", async () => {
    await expect(service.deleteFundMovement({ fmvId: 90, useBy: 9, scope: OTHER, ctx })).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("reporte", () => {
  it("el mes en español", () => {
    expect(service.monthLabel("2026-10")).toMatch(/oct/);
  });
});
