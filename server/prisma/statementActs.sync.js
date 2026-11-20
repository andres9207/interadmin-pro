import "dotenv/config";
import { prisma } from "../src/common/configs/prismaClient.js";
import { DELETED_STATUS } from "../src/common/constants/status.constants.js";
import { INVOICE_STATES } from "../src/modules/billing/invoices/invoiceTerms.js";
import { createActIfApproved } from "../src/modules/billing/statementManagement/statementActs.service.js";

/**
 * Acta automática, una vez (DEC-103): registra como acta A cada extracto que
 * ya tiene todas sus facturas aprobadas y todavía no es acta, en todas las
 * obras y etapas. Desde el 2026-11-20 lo hace solo la factura al aprobarse,
 * anularse, eliminarse o cambiar de extracto; esto cubre lo aprobado antes.
 *
 * Idempotente: correrlo otra vez no crea nada nuevo. Pasa por el mismo
 * service (bloqueo de la obra y bitácora) como el usuario 1 (Superadmin),
 * como `seed.demo.js`.
 *
 *   yarn db:sync-statement-acts
 */

const AUTHOR = 1;
const ctx = { useId: AUTHOR, ip: "script" };

const run = async () => {
  const invoices = await prisma.tbl_invoices.findMany({
    where: {
      sta_id: { not: DELETED_STATUS },
      inv_state: INVOICE_STATES.APPROVED,
      inv_statement: { not: null },
      NOT: { inv_statement: "" },
    },
    select: { wrk_id: true, wks_id: true, inv_statement: true, tbl_contracts: { select: { wks_id: true } } },
  });
  const targets = new Map();
  for (const inv of invoices) {
    const wksId = inv.wks_id ?? inv.tbl_contracts?.wks_id ?? null;
    const statement = String(inv.inv_statement).trim();
    targets.set(`${inv.wrk_id}|${wksId ?? 0}|${statement.toLowerCase()}`, { wrkId: inv.wrk_id, wksId, statement });
  }
  let created = 0;
  for (const target of targets.values()) {
    const fmvId = await createActIfApproved({ ...target, useBy: AUTHOR, ctx });
    if (fmvId) {
      created += 1;
      console.log(`Acta ${target.statement} · obra ${target.wrkId} · etapa ${target.wksId ?? "sin etapa"} → fmv_id ${fmvId}`);
    }
  }
  console.log(`Extractos revisados: ${targets.size}. Actas creadas: ${created}.`);
};

run()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
