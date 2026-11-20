-- Migración 0131: fondo rotatorio de la obra, y actas y abonos (Gerencia extractos)
--
-- Requiere: 0038 (tbl_works), 0040 (tbl_work_stages con UNIQUE (wks_id, wrk_id))
-- ya aplicados. No toca datos existentes.
--
-- DEC-103 (reunión con Intervé del 2026-11-18 y el cuadro "Control de pagos"
-- de la obra FLOR - ETAPA 4): el fondo rotatorio es la plata que se le
-- entrega a la constructora para que pague sin esperar a la interventoría.
-- Lo que DEC-084 dejó fuera (valor, anticipo y amortización del acta: fondo
-- rotatorio y fiducia) se registra aquí.
--
-- El ámbito de todo es la obra y, si la tiene, una etapa (wks_id; NULL: la
-- obra completa, o las facturas sin etapa). FK compuesta (wks_id, wrk_id): la
-- etapa es de la misma obra.
--
-- 1. tbl_rotating_funds: el fondo del ámbito, opcional, con su tope. Uno por
--    ámbito entre no eliminados (columna generada + UNIQUE).
-- 2. tbl_fund_movements: actas aprobadas y abonos del ámbito.
--    - El acta es el extracto: las facturas de la obra con ese texto en su
--      campo Extracto y de esa etapa. Su valor es el total de esas facturas,
--      calculado; no se guarda (fmv_value NULL).
--      NORMAL (acta, "A"): se amortiza completa.
--      SPECIAL (acta especial, "E"): sus facturas las pagó la fiducia;
--      fmv_withholding (retención que cobra la constructora) y
--      fmv_amortization (lo que se amortiza al fondo), escritos a mano.
--    - PAYMENT (abono, "F"): fmv_value es lo entregado al fondo. Paga a lo
--      sumo un acta de la misma obra (fmv_paid_id, FK compuesta; la misma
--      etapa la verifica el service), y cada acta la paga a lo sumo un abono
--      (UNIQUE sobre la columna generada).
--    Número único en el ámbito entre no eliminados, aparte para actas y para
--    abonos (columna generada). El saldo, lo que se le debe a la constructora
--    y los totales se calculan, nunca se guardan.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

CREATE TABLE `tbl_rotating_funds` (
  `rfd_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `wks_id` int DEFAULT NULL COMMENT 'Etapa del fondo; NULL: la obra completa',
  `rfd_limit` decimal(18,2) NOT NULL COMMENT 'Tope del fondo rotatorio',
  `rfd_description` varchar(500) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `rfd_create_by` int DEFAULT NULL,
  `rfd_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rfd_update_by` int DEFAULT NULL,
  `rfd_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rfd_delete_by` int DEFAULT NULL,
  `rfd_delete_at` timestamp NULL DEFAULT NULL,
  `rfd_idempotency_key` char(36) DEFAULT NULL,
  `rfd_idempotency_hash` char(64) DEFAULT NULL,
  `rfd_stage_active` int GENERATED ALWAYS AS (IF(`sta_id` <> 3, IFNULL(`wks_id`, 0), NULL)) VIRTUAL,
  PRIMARY KEY (`rfd_id`),
  UNIQUE INDEX `uq_rotating_funds_work_stage_active` (`wrk_id`, `rfd_stage_active`),
  UNIQUE INDEX `uq_rotating_funds_idempotency_key` (`rfd_idempotency_key`),
  INDEX `idx_rotating_funds_stage` (`wks_id`, `wrk_id`),
  CONSTRAINT `ck_rotating_funds_limit` CHECK (`rfd_limit` >= 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_rotating_funds`
ADD CONSTRAINT `tbl_rotating_funds_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_rotating_funds_stage` FOREIGN KEY (`wks_id`, `wrk_id`) REFERENCES `tbl_work_stages` (`wks_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_rotating_funds_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_rotating_funds_create_by` FOREIGN KEY (`rfd_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_rotating_funds_update_by` FOREIGN KEY (`rfd_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_rotating_funds_delete_by` FOREIGN KEY (`rfd_delete_by`) REFERENCES `tbl_users` (`use_id`);

CREATE TABLE `tbl_fund_movements` (
  `fmv_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `wks_id` int DEFAULT NULL COMMENT 'Etapa; NULL: la obra completa o las facturas sin etapa',
  `fmv_type` varchar(10) NOT NULL COMMENT 'NORMAL (acta), SPECIAL (acta especial), PAYMENT (abono)',
  `fmv_number` varchar(20) NOT NULL COMMENT 'Acta: el texto del extracto de sus facturas. Abono: su número',
  `fmv_document_date` date NOT NULL COMMENT 'Fecha del documento de la constructora',
  `fmv_approval_date` date NOT NULL COMMENT 'Fecha de aprobación; decide el mes del movimiento',
  `fmv_value` decimal(18,2) DEFAULT NULL COMMENT 'Abono: lo entregado. Especial escrita a mano: lo pagado por la fiducia (sin facturas). NULL: el valor del acta sale de sus facturas',
  `fmv_withholding` decimal(18,2) DEFAULT NULL COMMENT 'Solo especial: retención que cobra la constructora',
  `fmv_amortization` decimal(18,2) DEFAULT NULL COMMENT 'Solo especial: lo que se amortiza al fondo',
  `fmv_paid_id` int DEFAULT NULL COMMENT 'Solo abono: el acta que paga',
  `fmv_description` varchar(500) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `fmv_create_by` int DEFAULT NULL,
  `fmv_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fmv_update_by` int DEFAULT NULL,
  `fmv_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fmv_delete_by` int DEFAULT NULL,
  `fmv_delete_at` timestamp NULL DEFAULT NULL,
  `fmv_idempotency_key` char(36) DEFAULT NULL,
  `fmv_idempotency_hash` char(64) DEFAULT NULL,
  `fmv_number_active` varchar(40) GENERATED ALWAYS AS (
    IF(`sta_id` <> 3, CONCAT(IFNULL(`wks_id`, 0), '|', IF(`fmv_type` = 'PAYMENT', 'F', 'A'), '|', `fmv_number`), NULL)
  ) VIRTUAL,
  `fmv_paid_active` int GENERATED ALWAYS AS (IF(`sta_id` <> 3, `fmv_paid_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`fmv_id`),
  UNIQUE INDEX `uq_fund_movements_id_work` (`fmv_id`, `wrk_id`),
  UNIQUE INDEX `uq_fund_movements_work_number_active` (`wrk_id`, `fmv_number_active`),
  UNIQUE INDEX `uq_fund_movements_paid_active` (`fmv_paid_active`),
  UNIQUE INDEX `uq_fund_movements_idempotency_key` (`fmv_idempotency_key`),
  INDEX `idx_fund_movements_stage` (`wks_id`, `wrk_id`),
  INDEX `idx_fund_movements_paid` (`fmv_paid_id`, `wrk_id`),
  CONSTRAINT `ck_fund_movements_type` CHECK (`fmv_type` IN ('NORMAL', 'SPECIAL', 'PAYMENT')),
  -- El abono siempre lleva su valor y la normal nunca (sale de sus facturas). La
  -- especial, de sus facturas (NULL) o escrita a mano (lo pagado por la fiducia).
  CONSTRAINT `ck_fund_movements_value` CHECK (`fmv_type` = 'SPECIAL' OR ((`fmv_type` = 'PAYMENT') = (`fmv_value` IS NOT NULL))),
  CONSTRAINT `ck_fund_movements_special_fields` CHECK (
    (`fmv_type` = 'SPECIAL' AND `fmv_withholding` IS NOT NULL AND `fmv_amortization` IS NOT NULL)
    OR (`fmv_type` <> 'SPECIAL' AND `fmv_withholding` IS NULL AND `fmv_amortization` IS NULL)
  ),
  CONSTRAINT `ck_fund_movements_paid` CHECK (`fmv_paid_id` IS NULL OR `fmv_type` = 'PAYMENT'),
  CONSTRAINT `ck_fund_movements_amounts` CHECK (IFNULL(`fmv_value`, 0) >= 0 AND IFNULL(`fmv_withholding`, 0) >= 0 AND IFNULL(`fmv_amortization`, 0) >= 0),
  CONSTRAINT `ck_fund_movements_dates` CHECK (`fmv_approval_date` >= `fmv_document_date`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_fund_movements`
ADD CONSTRAINT `tbl_fund_movements_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_fund_movements_stage` FOREIGN KEY (`wks_id`, `wrk_id`) REFERENCES `tbl_work_stages` (`wks_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_fund_movements_paid` FOREIGN KEY (`fmv_paid_id`, `wrk_id`) REFERENCES `tbl_fund_movements` (`fmv_id`, `wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_fund_movements_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`),
ADD CONSTRAINT `tbl_fund_movements_create_by` FOREIGN KEY (`fmv_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_fund_movements_update_by` FOREIGN KEY (`fmv_update_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_fund_movements_delete_by` FOREIGN KEY (`fmv_delete_by`) REFERENCES `tbl_users` (`use_id`);
