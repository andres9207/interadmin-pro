import { body, query } from "express-validator";
import { optionalText, requiredId, idempotencyKeyRule, exportFormatRule, moneyRule } from "../../../common/utils/validation.utils.js";
import { FUND_MOVEMENT_TYPES } from "./fundFigures.js";

// Forma y tipo de cada campo (ENDPOINT_STANDARD, paso 3). El alcance por
// obra, la etapa de la obra, las facturas del extracto, el número único, el
// acta que paga un abono y lo que aplica a cada tipo, en el service (DEC-103).

const isNewId = (id) => Number.isNaN(Number(id)) || Number(id) <= 0;
const isCreateFund = (req) => isNewId(req.body.rfdId);
const isCreateMovement = (req) => isNewId(req.body.fmvId);

const dateRule = (field, label) =>
  body(field)
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage(`La ${label} es requerida (AAAA-MM-DD).`)
    .bail()
    .isISO8601({ strict: true })
    .withMessage(`La ${label} no es válida.`);

const workQuery = query("wrkId").isInt({ min: 1 }).withMessage("wrkId es obligatorio y debe ser un entero positivo.");
// La etapa del ámbito; vacía o 0: la obra completa o las facturas sin etapa.
const stageQuery = query("wksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("wksId debe ser un entero positivo.");
const stageBody = body("wksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("wksId debe ser un entero positivo.");

export const getManagementSchema = [workQuery];

export const getScopeReportSchema = [workQuery, stageQuery];

export const saveFundSchema = [
  idempotencyKeyRule(isCreateFund),
  body("rfdId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("rfdId debe ser un entero positivo."),
  body("wrkId").if(isCreateFund).isInt({ min: 1 }).withMessage("Selecciona la obra del fondo."),
  stageBody,
  moneyRule("limit", "tope del fondo"),
  optionalText("description", 500),
];

export const deleteFundSchema = [requiredId("rfdId")];

const isType = (type) => (req) => req.body.type === type;

export const saveFundMovementSchema = [
  idempotencyKeyRule(isCreateMovement),
  body("fmvId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("fmvId debe ser un entero positivo."),
  body("wrkId").if(isCreateMovement).isInt({ min: 1 }).withMessage("Selecciona la obra."),
  stageBody,
  // El tipo no cambia al editar: el service usa el guardado.
  body("type").isIn(Object.values(FUND_MOVEMENT_TYPES)).withMessage("El tipo debe ser acta, acta especial o abono."),
  // El número del abono lo asigna el servidor; al editar, ninguno cambia.
  body("number")
    .if((value, { req }) => isCreateMovement(req) && req.body.type !== FUND_MOVEMENT_TYPES.PAYMENT)
    .trim()
    .notEmpty()
    .withMessage("El número es requerido.")
    .isLength({ max: 20 })
    .withMessage("El número admite hasta 20 caracteres."),
  dateRule("documentDate", "fecha del documento"),
  dateRule("approvalDate", "fecha de aprobación"),
  // El valor del acta sale de sus facturas; solo el abono lo escribe.
  moneyRule("value", "valor del abono", { when: isType(FUND_MOVEMENT_TYPES.PAYMENT) }),
  // La especial escrita a mano lleva lo pagado por la fiducia; la de un extracto, no (sale de sus facturas).
  moneyRule("value", "pagado por la fiducia", { optional: true, when: isType(FUND_MOVEMENT_TYPES.SPECIAL) }),
  moneyRule("withholding", "retención de pagos especiales", { when: isType(FUND_MOVEMENT_TYPES.SPECIAL) }),
  // En la escrita a mano (con lo pagado por la fiducia) la amortización es la retención: no se pide.
  moneyRule("amortization", "amortización al fondo", {
    when: (req) => req.body.type === FUND_MOVEMENT_TYPES.SPECIAL && !String(req.body.value ?? "").trim(),
  }),
  body("paidId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("paidId debe ser un entero positivo."),
  optionalText("description", 500),
];

export const deleteFundMovementSchema = [requiredId("fmvId")];

export const exportScopeReportSchema = [
  requiredId("wrkId"),
  body("wksId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("wksId debe ser un entero positivo."),
  exportFormatRule(),
];
