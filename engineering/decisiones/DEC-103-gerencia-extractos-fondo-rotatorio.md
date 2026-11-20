# DEC-103 — Gerencia extractos: actas desde las facturas y fondo rotatorio

**Fecha:** 2026-11-18 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md) (sin ADR propio)

Pedido por el usuario el 2026-11-18, después de la reunión con Intervé sobre el control del fondo rotatorio (resumen y transcripción en [`docs/reuniones/2026-11-18-fondo-rotatorio-gerencia-extractos.md`](../../docs/reuniones/2026-11-18-fondo-rotatorio-gerencia-extractos.md)). El ejemplo de referencia es el cuadro "Control de pagos" de la obra FLOR - ETAPA 4 (constructora Ménsula), que hoy se lleva en Excel. Lo que [DEC-084](DEC-084-extractos.md) dejó fuera (el valor, el anticipo y la amortización del acta: fondo rotatorio y fiducia) se registra aquí.

El objetivo es responder dos cosas: **cuánto lleva la obra y cuánto se le debe a la constructora.**

## Decisión

- **Vista nueva, "Gerencia extractos"**, aparte de Extractos, en el grupo Inicio (página 24, `billing/statementManagement`).
- **Ámbito:** la obra y, si la tiene, cada etapa (una pestaña por ámbito). Con etapas, las facturas sin etapa van a "Sin etapa".
- **El acta es el extracto** (decisión del usuario, 2026-11-18). Son las facturas de la obra con ese texto en su campo Extracto ([DEC-084](DEC-084-extractos.md)), sin distinguir mayúsculas ni tildes, y de esa etapa: la factura simple, la suya; la de contrato, la de su contrato.
  - **Su valor es el total de esas facturas, sin las anuladas**, calculado al leer y nunca guardado. Si cambian sus facturas, cambia el acta. Una factura sin importes de impuestos aporta su valor.
  - **Se ven siempre**, haya fondo o no, en el cuadro: **una fila por extracto, en el mes de su factura más reciente** (decisión del usuario, 2026-11-18), esté aprobado o no; los abonos, en el de su aprobación. El saldo corre en ese orden.
  - El extracto que todavía no es acta sale en su mes con sus campos vacíos (fecha acta, fecha aprobación y tipo; en la especial, retención y amortización), que se llenan en la celda y se guardan desde la fila. La fecha acta propone la de su factura más reciente; la de aprobación, si todas sus facturas vivas ya están aprobadas, la de la última aprobación (decisión del usuario, 2026-11-20); si alguna falta, queda vacía.
  - **Acumulado mensual** = actas del mes + extractos por aprobar del mes: lo que lleva la obra.
  - **Aprobar como acta** registra la fecha del documento, la de aprobación (decide el mes) y el tipo. En la normal (A), el valor se amortiza completo. En la especial (E), las facturas las pagó la fiducia directo a los proveedores, y se escriben a mano la retención que cobra la constructora y la amortización al fondo. El valor de la especial es facturas + retención.
  - **Acta automática** (decisión del usuario, 2026-11-20): cuando todas las facturas vivas de un extracto (sin las anuladas) quedan aprobadas, el extracto pasa solo a acta A, con la fecha de su factura más reciente y la de la última aprobación. Lo dispara la factura al aprobarse, anularse, eliminarse o cambiar de extracto o de etapa, **después** de su transacción y en una propia que bloquea la obra (la obra va antes del contrato y la factura en `LOCK_ORDER`, así que no cabe en la de la factura). Es idempotente; si falla, se registra en el log, la factura queda como quedó y el extracto sigue por aprobar, para guardarlo a mano. Lo aprobado antes se convierte una vez con `yarn db:sync-statement-acts` (`server/prisma/statementActs.sync.js`).
  - Un extracto sin facturas en el ámbito no se aprueba (409). El extracto de un acta no cambia; su tipo pasa de A a E (o al revés) al editarla, mientras ningún abono la pague (409). Eliminarla la devuelve a "por aprobar" sin tocar sus facturas; si todas siguen aprobadas, la próxima operación sobre una de ellas la vuelve a registrar.
- **Acta especial escrita a mano** (decisión del usuario, 2026-11-20): desde el botón "Nuevo abono / especial" se registra una E sin facturas, con su número, lo pagado por la fiducia (`fmv_value`), la retención y la amortización, escritos a mano. **La amortización es la misma retención: un solo campo** (decisión del usuario, 2026-11-20, como el acta 04 del cuadro de Intervé). La E que sale de un extracto sigue escribiendo las dos, porque pueden ser distintas (acta 27 de octubre). Valor del acta = pagado por la fiducia + retención; va en el mes de su fecha acta. No exige fondo ni facturas, y al editarla sigue siendo E. El `CHECK ck_fund_movements_value` de la migración 0131 lo admite: la especial lleva `fmv_value` (a mano) o no (de su extracto).
- **El fondo rotatorio es opcional**, uno por ámbito, con su **tope** (cambiarlo exige el permiso 127 y queda en la bitácora). Agrega los abonos y el saldo. La vista no ofrece eliminarlo (decisión del usuario, 2026-11-20); el endpoint `delete_fund` sigue en el servidor.
- **Abono (F):** lo entregado al fondo. Exige el fondo del ámbito. **Su número es consecutivo en el ámbito** (decisión del usuario, 2026-11-20): lo asigna el servidor bajo el bloqueo de la obra (el mayor entero de los abonos vivos + 1, con dos cifras: 01, 02…) y no cambia al editar. **Paga a lo sumo un acta**, y cada acta la paga a lo sumo un abono (`UNIQUE` en la BD). No supera lo que el acta amortiza. Sin acta, es una entrega al fondo, como la inicial.
- **Cifras calculadas, nunca guardadas** (`fundFigures.js`):
  - **Saldo del fondo** = Σ abonos − Σ amortizaciones. Puede ser negativo.
  - **Se le debe a la constructora** = Σ (amortización de cada acta − el abono que la paga).
  - **Pagado por la fiducia** = abonos + facturas de las actas especiales.
- **Constructora:** la de la obra. **Glosas de cada acta:** las levantadas y liberadas en su extracto, en la obra ([DEC-085](DEC-085-glosas.md)).
- **Reintegro:** las columnas Reint y Valor del cuadro de Excel quedan fuera (decisión del usuario).
- **Permisos:** 126 ver (todos los perfiles), 127 gestionar el fondo, 128 aprobar actas y registrar abonos, 129 exportar. Toda escritura exige además ver.
- **Bloqueo:** toda escritura bloquea la obra; editar o eliminar el fondo, además el fondo (`FONDO_ROTATORIO`, después de `EXTRACTO` en `LOCK_ORDER`). Las facturas no se bloquean: el valor del acta se lee cuando se muestra.
- **Protecciones:** una obra con fondo, actas o abonos no se elimina, y una etapa con ellos no se quita. Un fondo con abonos no se elimina; un acta que paga un abono, tampoco.
- **Reporte** en Excel o PDF. El Excel es la tabla de la pantalla en una hoja (`fundReportSheet.js`, pedido del usuario, 2026-11-20): las cifras de arriba, la leyenda, las mismas columnas, cada mes con sus actas, extractos por aprobar (con lo que la fila propone: acta A) y abonos agrupados debajo para plegarlos, mes y acumulado combinados, los mismos colores (tema claro) y la fila de total. El PDF: el resumen, los totales por mes, las actas y abonos agrupados por mes con su subtotal, y los extractos por aprobar.

## Límites conocidos

- Las facturas de la obra con extracto se leen en una sola consulta con el tope de un reporte (5.000, `EXPORT_MAX_ROWS`); si una obra lo pasa, la vista responde 422.
- Las glosas se cruzan por el número del extracto en la obra: si dos etapas usan el mismo número, la glosa aparece en las dos.

## Dónde

Migraciones `0131_create_rotating_funds.sql` y `0132_seed_statement_management_pages_permissions.sql` · `server/src/modules/billing/statementManagement/` (`statementActs.service.js`: el acta automática) y `workStatementInvoices` en `invoices.service.js` · Cliente: `views/billing/statementManagement/`, `api/requests/statementManagementApi.js` · Tests: `fundFigures.test.js` (con las cifras de octubre de FLOR - ETAPA 4), `statementManagement.service.test.js`.
