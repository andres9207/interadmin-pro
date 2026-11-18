import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { requirePermission } from "../../../common/middlewares/requirePermission.middleware.js";
import { validate } from "../../../common/middlewares/validate.middleware.js";
import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import {
  getManagementSchema,
  getScopeReportSchema,
  saveFundSchema,
  deleteFundSchema,
  saveFundMovementSchema,
  deleteFundMovementSchema,
  exportScopeReportSchema,
} from "./statementManagement.validation.js";
import {
  getManagementController,
  getScopeReportController,
  saveFundController,
  deleteFundController,
  saveFundMovementController,
  deleteFundMovementController,
  exportScopeReportController,
} from "./statementManagement.controller.js";

// Gerencia extractos (DEC-103), montada en /api/billing/statementManagement.
// Pipeline de ENDPOINT_STANDARD: verifyToken → requirePermission → esquema → validate → controller.
// Toda escritura exige además ver (el permiso de la página).
const can = PERMISSIONS.billing.statementManagement;
const canView = requirePermission(can.view);
const routes = express.Router();

routes.get("/get_management", verifyToken, canView, getManagementSchema, validate, getManagementController);
routes.get("/get_scope_report", verifyToken, canView, getScopeReportSchema, validate, getScopeReportController);
routes.post("/save_fund", verifyToken, canView, requirePermission(can.manageFunds), saveFundSchema, validate, saveFundController);
routes.put("/delete_fund", verifyToken, canView, requirePermission(can.manageFunds), deleteFundSchema, validate, deleteFundController);
routes.post(
  "/save_fund_movement",
  verifyToken,
  canView,
  requirePermission(can.manageMovements),
  saveFundMovementSchema,
  validate,
  saveFundMovementController,
);
routes.put(
  "/delete_fund_movement",
  verifyToken,
  canView,
  requirePermission(can.manageMovements),
  deleteFundMovementSchema,
  validate,
  deleteFundMovementController,
);
routes.post(
  "/export_scope_report",
  verifyToken,
  canView,
  requirePermission(can.export),
  exportScopeReportSchema,
  validate,
  exportScopeReportController,
);

export default routes;
