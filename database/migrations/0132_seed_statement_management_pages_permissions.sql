-- Migración 0132: página "Gerencia extractos" y sus permisos
--
-- Requiere: 0111 (grupo "Inicio", página 13), 0119 (página 21, Extractos),
-- 0128 (per_id hasta 125) y 0131 (tablas del fondo rotatorio) ya aplicados.
--
-- DEC-103: vista nueva, aparte de Extractos, en el grupo Inicio. Página 24:
-- los ids 22 y 23 se usaron y se retiraron (0091, 0109) y no se reutilizan.
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.statementManagement).
--
-- Quien tiene la página de Extractos (21) recibe esta. Los permisos no se
-- otorgan aquí: `yarn db:seed` da el de ver a todos los perfiles y los de
-- gestión al perfil Superadmin.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(24, 'Gerencia extractos', 13, 'billing/statementManagement', 'report-money', 7, 'Gerencia extractos', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(126, 'Ver gerencia extractos', 24, 0),
(127, 'Gestionar fondo rotatorio', 24, 1),
(128, 'Gestionar actas y abonos del fondo', 24, 2),
(129, 'Exportar gerencia extractos', 24, 3);

INSERT INTO `tbl_page_permissions` (`pro_id`, `pag_id`)
SELECT DISTINCT pp.`pro_id`, 24
FROM `tbl_page_permissions` pp
WHERE pp.`pag_id` = 21
  AND NOT EXISTS (SELECT 1 FROM `tbl_page_permissions` x WHERE x.`pro_id` = pp.`pro_id` AND x.`pag_id` = 24);

INSERT INTO `tbl_user_pages` (`use_id`, `pag_id`)
SELECT DISTINCT up.`use_id`, 24
FROM `tbl_user_pages` up
WHERE up.`pag_id` = 21
  AND NOT EXISTS (SELECT 1 FROM `tbl_user_pages` x WHERE x.`use_id` = up.`use_id` AND x.`pag_id` = 24);
