-- Migración 0130: varias sesiones por usuario (DEC-102, reemplaza la sesión
-- única de DEC-002 y ADR-0001, regla 3).
--
-- Requiere: 0007_create_sessions.sql.
--
-- Un usuario puede tener abiertas varias sesiones a la vez (varios
-- dispositivos o navegadores): cada login inserta una fila nueva en vez de
-- reemplazar la anterior. Se quita UNIQUE(use_id) y se deja un índice normal,
-- que sigue respaldando el FK tbl_sessions_users y las búsquedas por usuario
-- (revocar todas las sesiones, limpiar las vencidas).
--
-- El índice nuevo va antes de quitar el único: MySQL no deja sin índice la
-- columna de un FK.
--
-- No toca datos: las sesiones vivas siguen sirviendo.

ALTER TABLE `tbl_sessions`
ADD INDEX `ix_sessions_use_id` (`use_id`) USING BTREE;

ALTER TABLE `tbl_sessions`
DROP INDEX `uq_sessions_use_id`;
