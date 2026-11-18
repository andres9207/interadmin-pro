import httpCliente from 'api/services/httpCliente';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Gerencia extractos (DEC-103). El ámbito es la obra y, si la tiene, una
 * etapa (`wksId`; null: la obra completa o las facturas sin etapa). El acta es
 * el extracto de las facturas: su valor sale de ellas. Todas las cifras (saldo,
 * lo que se le debe a la constructora, totales por mes) las calcula el servidor.
 */

/** Ámbitos de la obra (una pestaña por ámbito), cada uno con su fondo y su resumen. @param {number} wrkId */
export const getManagementAPI = (wrkId) => httpCliente.get('billing/statementManagement/get_management', { wrkId });

/** El cuadro de un ámbito: fondo, resumen, meses, actas con sus facturas, abonos y extractos por aprobar. */
export const getScopeReportAPI = (wrkId, wksId) =>
  httpCliente.get('billing/statementManagement/get_scope_report', { wrkId, wksId: wksId ?? '' });

/**
 * Crear el fondo de un ámbito (sin `rfdId`, con `wrkId` y `wksId`) o cambiar su tope y descripción.
 * @param {{ rfdId?, wrkId?, wksId?, limit, description? }} params
 */
export const saveFundAPI = (params, idempotencyKey) =>
  httpCliente.post('billing/statementManagement/save_fund', params, idempotencyConfig(idempotencyKey));

export const deleteFundAPI = (rfdId) => httpCliente.put('billing/statementManagement/delete_fund', { rfdId });

/**
 * Aprobar un extracto como acta o registrar un abono (sin `fmvId`, con `wrkId`, `wksId` y `type`), o editarlos.
 * @param {{ fmvId?, wrkId?, wksId?, type, number, documentDate, approvalDate, value?, withholding?, amortization?, paidId?, description? }} params
 */
export const saveFundMovementAPI = (params, idempotencyKey) =>
  httpCliente.post('billing/statementManagement/save_fund_movement', params, idempotencyConfig(idempotencyKey));

export const deleteFundMovementAPI = (fmvId) => httpCliente.put('billing/statementManagement/delete_fund_movement', { fmvId });

/** El cuadro del ámbito en Excel o PDF (DEC-070). @param {'xlsx'|'pdf'} format */
export const exportScopeReportAPI = (wrkId, wksId, format) =>
  httpCliente.post('billing/statementManagement/export_scope_report', { wrkId, wksId, format }, { responseType: 'blob' });
