import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import { sendExport } from "../../../common/services/export.service.js";
import * as service from "./statementManagement.service.js";

// Solo leen la petición y delegan (DEC-103). El autor sale de req.user; la
// clave de idempotencia, del encabezado (DEC-016); el alcance por obra, de
// workScopeOf (DEC-047).

const notify = () => getIO().emit("refresh-statement-management", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

const handleExport = (fn) => async (req, res, next) => {
  try {
    sendExport(res, await fn(req));
  } catch (err) {
    next(err);
  }
};

export const getManagementController = handle(async (req) =>
  service.getManagement({ wrkId: req.query.wrkId, scope: await workScopeOf(req) }),
);

export const getScopeReportController = handle(async (req) =>
  service.getScopeReport({ wrkId: req.query.wrkId, wksId: req.query.wksId, scope: await workScopeOf(req) }),
);

export const saveFundController = handle(async (req) => {
  const { rfdId, wrkId, wksId, limit, description } = req.body;
  const result = await service.saveFund({
    rfdId,
    input: { wrkId, wksId, limit, description },
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const deleteFundController = handle(async (req) => {
  const result = await service.deleteFund({
    rfdId: req.body.rfdId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const saveFundMovementController = handle(async (req) => {
  const { fmvId, wrkId, wksId, type, number, documentDate, approvalDate, value, withholding, amortization, paidId, description } = req.body;
  const result = await service.saveFundMovement({
    fmvId,
    input: { wrkId, wksId, type, number, documentDate, approvalDate, value, withholding, amortization, paidId, description },
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const deleteFundMovementController = handle(async (req) => {
  const result = await service.deleteFundMovement({
    fmvId: req.body.fmvId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const exportScopeReportController = handleExport(async (req) =>
  service.exportScopeReport({ wrkId: req.body.wrkId, wksId: req.body.wksId, format: req.body.format, scope: await workScopeOf(req) }),
);
