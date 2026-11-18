# DEC-103 — Gerencia extractos: actas desde las facturas y fondo rotatorio

**Fecha:** 2026-11-18 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md) (sin ADR propio)

Pedido por el usuario el 2026-11-18, después de la reunión con Intervé sobre el control del fondo rotatorio. El ejemplo de referencia es el cuadro "Control de pagos" de la obra FLOR - ETAPA 4 (constructora Ménsula), que hoy se lleva en Excel. Lo que [DEC-084](DEC-084-extractos.md) dejó fuera (el valor, el anticipo y la amortización del acta: fondo rotatorio y fiducia) se registra aquí.

El objetivo es responder dos cosas: **cuánto lleva la obra y cuánto se le debe a la constructora.**

## Decisión

- **Vista nueva, "Gerencia extractos"**, aparte de Extractos, en el grupo Inicio (página 24, `billing/statementManagement`).
- **Ámbito:** la obra y, si la tiene, cada etapa (una pestaña por ámbito). Con etapas, las facturas sin etapa van a "Sin etapa".
- **El acta es el extracto** (decisión del usuario, 2026-11-18). Son las facturas de la obra con ese texto en su campo Extracto ([DEC-084](DEC-084-extractos.md)), sin distinguir mayúsculas ni tildes, y de esa etapa: la factura simple, la suya; la de contrato, la de su contrato.
  - **Su valor es el total de esas facturas, sin las anuladas**, calculado al leer y nunca guardado. Si cambian sus facturas, cambia el acta. Una factura sin importes de impuestos aporta su valor.
  - **Se ven siempre**, haya fondo o no, en el cuadro: **una fila por extracto, en el mes de su factura más reciente** (decisión del usuario, 2026-11-18), esté aprobado o no; los abonos, en el de su aprobación. El saldo corre en ese orden.
  - El extracto que todavía no es acta sale en su mes con sus campos vacíos (fecha acta, fecha aprobación y tipo; en la especial, retención y amortización), que se llenan en la celda y se guardan desde la fila.
  - **Acumulado mensual** = actas del mes + extractos por aprobar del mes: lo que lleva la obra.
  - **Aprobar como acta** registra la fecha del documento, la de aprobación (decide el mes) y el tipo. En la normal (A), el valor se amortiza completo. En la especial (E), las facturas las pagó la fiducia directo a los proveedores, y se escriben a mano la retención que cobra la constructora y la amortización al fondo. El valor de la especial es facturas + retención.
  - Un extracto sin facturas en el ámbito no se aprueba (409). El tipo y el extracto de un acta no cambian; eliminarla la devuelve a "por aprobar" sin tocar sus facturas.
- **El fondo rotatorio es opcional**, uno por ámbito, con su **tope** (cambiarlo exige el permiso 127 y queda en la bitácora). Agrega los abonos y el saldo.
- **Abono (F):** lo entregado al fondo. Exige el fondo del ámbito. **Paga a lo sumo un acta**, y cada acta la paga a lo sumo un abono (`UNIQUE` en la BD). No supera lo que el acta amortiza. Sin acta, es una entrega al fondo, como la inicial.
- **Cifras calculadas, nunca guardadas** (`fundFigures.js`):
  - **Saldo del fondo** = Σ abonos − Σ amortizaciones. Puede ser negativo.
  - **Se le debe a la constructora** = Σ (amortización de cada acta − el abono que la paga).
  - **Pagado por la fiducia** = abonos + facturas de las actas especiales.
- **Constructora:** la de la obra. **Glosas de cada acta:** las levantadas y liberadas en su extracto, en la obra ([DEC-085](DEC-085-glosas.md)).
- **Reintegro:** las columnas Reint y Valor del cuadro de Excel quedan fuera (decisión del usuario).
- **Permisos:** 126 ver (todos los perfiles), 127 gestionar el fondo, 128 aprobar actas y registrar abonos, 129 exportar. Toda escritura exige además ver.
- **Bloqueo:** toda escritura bloquea la obra; editar o eliminar el fondo, además el fondo (`FONDO_ROTATORIO`, después de `EXTRACTO` en `LOCK_ORDER`). Las facturas no se bloquean: el valor del acta se lee cuando se muestra.
- **Protecciones:** una obra con fondo, actas o abonos no se elimina, y una etapa con ellos no se quita. Un fondo con abonos no se elimina; un acta que paga un abono, tampoco.
- **Reporte** en Excel o PDF: el resumen, los totales por mes, las actas y abonos agrupados por mes con su subtotal, y los extractos por aprobar.

## Límites conocidos

- Las facturas de la obra con extracto se leen en una sola consulta con el tope de un reporte (5.000, `EXPORT_MAX_ROWS`); si una obra lo pasa, la vista responde 422.
- Las glosas se cruzan por el número del extracto en la obra: si dos etapas usan el mismo número, la glosa aparece en las dos.

## Dónde

Migraciones `0131_create_rotating_funds.sql` y `0132_seed_statement_management_pages_permissions.sql` · `server/src/modules/billing/statementManagement/` y `workStatementInvoices` en `invoices.service.js` · Cliente: `views/billing/statementManagement/`, `api/requests/statementManagementApi.js` · Tests: `fundFigures.test.js` (con las cifras de octubre de FLOR - ETAPA 4), `statementManagement.service.test.js`.
