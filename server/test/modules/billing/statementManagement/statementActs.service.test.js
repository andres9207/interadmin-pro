import { jest } from "@jest/globals";
import { transactionRawMocks } from "../../../helpers/transaction.mock.js";

// Acta automática (DEC-103): un extracto con todas sus facturas vivas
// aprobadas pasa solo a acta A, bloqueando la obra, con bitácora. Una vez.

const state = {};

const prismaMock = {
  tbl_fund_movements: {
    findFirst: jest.fn(async () => state.existing),
    create: jest.fn(async () => ({ fmv_id: 300 })),
  },
  tbl_invoices: {
    findMany: jest.fn(async () => state.invoices),
    findUnique: jest.fn(async () => state.invoice),
  },
  tbl_audit_log: { createMany: jest.fn() },
  ...transactionRawMocks(),
  $transaction: jest.fn((fn) => fn({ ...prismaMock })),
};

const logger = { warn: jest.fn(), info: jest.fn(), error: jest.fn() };
jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));
jest.unstable_mockModule("../../../../src/common/configs/winston.config.js", () => ({ default: logger }));

const service = await import("../../../../src/modules/billing/statementManagement/statementActs.service.js");

const ctx = { useId: 9, ip: "1.1.1.1" };
const day = (text) => new Date(`${text}T00:00:00Z`);
const approved = (date, approvalDate) => ({ inv_state: "APPROVED", inv_date: day(date), inv_approval_date: day(approvalDate) });
const lockedTables = () =>
  prismaMock.$queryRaw.mock.calls.map((call) =>
    call
      .slice(1)
      .map((v) => v?.strings?.join("") ?? "")
      .join(" "),
  );
const create = (overrides = {}) => service.createActIfApproved({ wrkId: 8, wksId: 4, statement: " 25 ", useBy: 9, ctx, ...overrides });

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.$transaction.mockImplementation((fn) => fn({ ...prismaMock }));
  Object.assign(state, { existing: null, invoices: [], invoice: null });
});

describe("crear el acta cuando el extracto queda aprobado", () => {
  it("con todas sus facturas aprobadas: acta A con la última factura y la última aprobación, bloqueando la obra", async () => {
    state.invoices = [approved("2026-10-05", "2026-10-20"), approved("2026-10-27", "2026-11-03")];
    await expect(create()).resolves.toBe(300);
    expect(lockedTables()).toEqual([expect.stringMatching(/tbl_works/)]);
    // Las facturas de la obra y la etapa con ese extracto, sin las anuladas ni eliminadas.
    expect(prismaMock.tbl_invoices.findMany.mock.calls[0][0].where).toMatchObject({
      wrk_id: 8,
      inv_statement: "25",
      inv_state: { not: "CANCELLED" },
      sta_id: { not: 3 },
    });
    const { data } = prismaMock.tbl_fund_movements.create.mock.calls[0][0];
    expect(data).toMatchObject({ wrk_id: 8, wks_id: 4, fmv_type: "NORMAL", fmv_number: "25", fmv_create_by: 9 });
    expect(data.fmv_document_date.toISOString()).toBe("2026-10-27T00:00:00.000Z");
    expect(data.fmv_approval_date.toISOString()).toBe("2026-11-03T00:00:00.000Z");
    const audit = prismaMock.tbl_audit_log.createMany.mock.calls.flatMap((c) => c[0].data);
    expect(audit.map((r) => r.aud_field)).toEqual(expect.arrayContaining(["fmv_type", "fmv_number", "fmv_approval_date"]));
  });

  it("con alguna factura sin aprobar, sigue por aprobar", async () => {
    state.invoices = [
      approved("2026-10-05", "2026-10-20"),
      { inv_state: "REGISTERED", inv_date: day("2026-10-06"), inv_approval_date: null },
    ];
    await expect(create()).resolves.toBeNull();
    expect(prismaMock.tbl_fund_movements.create).not.toHaveBeenCalled();
  });

  it("si ya es acta (o no tiene facturas), no crea otra", async () => {
    state.existing = { fmv_id: 5 };
    state.invoices = [approved("2026-10-05", "2026-10-20")];
    await expect(create()).resolves.toBeNull();
    state.existing = null;
    state.invoices = [];
    await expect(create()).resolves.toBeNull();
    expect(prismaMock.tbl_fund_movements.create).not.toHaveBeenCalled();
  });

  it("sin extracto no hace nada", async () => {
    await expect(create({ statement: "  " })).resolves.toBeNull();
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });
});

describe("después de operar sobre una factura", () => {
  it("la etapa de la factura de contrato es la de su contrato", async () => {
    state.invoice = { wrk_id: 8, wks_id: null, inv_statement: " 25 ", tbl_contracts: { wks_id: 4 } };
    await expect(service.invoiceStatementTarget(70)).resolves.toEqual({ wrkId: 8, wksId: 4, statement: "25" });
    state.invoice = { wrk_id: 8, wks_id: null, inv_statement: null, tbl_contracts: null };
    await expect(service.invoiceStatementTarget(70)).resolves.toBeNull();
  });

  it("revisa cada extracto una vez y un error no hace fallar la operación", async () => {
    prismaMock.$transaction.mockImplementation(async () => {
      throw new Error("Lock wait timeout");
    });
    const target = { wrkId: 8, wksId: 4, statement: "25" };
    await expect(service.syncStatementActs([target, { ...target, statement: "25" }, null], { useBy: 9, ctx })).resolves.toBeUndefined();
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('extracto "25"'));
  });
});
