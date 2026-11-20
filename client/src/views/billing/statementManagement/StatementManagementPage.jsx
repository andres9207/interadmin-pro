import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { IconEdit, IconPlus } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import ExportButton from 'ui-component/extended/ExportButton';
import SearchSelect from 'ui-component/extended/SearchSelect';
import { Figure } from 'ui-component/extended/DetailBlocks';
import ActInvoicesDialog from './components/ActInvoicesDialog';
import FundDialog from './components/FundDialog';
import FundTable, { PaymentLegend } from './components/FundTable';
import MovementDialog from './components/MovementDialog';
import { deleteFundMovementAPI, exportScopeReportAPI, getManagementAPI, getScopeReportAPI } from 'api/requests/statementManagementApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { ALL_WORKS } from 'utils/workScope';
import { STATEMENT_MANAGEMENT_PATH } from 'utils/constants';

/**
 * Gerencia extractos (DEC-103). Una pestaña por ámbito: la obra completa o,
 * si tiene etapas, cada etapa (y "Sin etapa" para las facturas que no tienen).
 * El acta es el extracto: las facturas con ese texto en su campo Extracto, y
 * su valor es el total de ellas. El cuadro va por meses (el de la factura más
 * reciente de cada extracto); los extractos por aprobar salen en él con sus
 * campos vacíos, que se llenan en la celda. El fondo rotatorio es opcional: agrega
 * el tope, los abonos y el saldo. Todas las cifras las calcula el servidor.
 */

/** Texto de la confirmación de eliminar: un abono o un acta. */
const confirmMessage = (confirming) => {
  if (!confirming) return '';
  if (confirming.item.type === 'PAYMENT') return `¿Eliminar el abono ${confirming.item.number}?`;
  return `¿Eliminar el acta ${confirming.item.number}? Vuelve al cuadro con sus campos vacíos; sus facturas no se tocan. Si un abono la paga, primero el abono.`;
};

const scopeKey = (wksId) => (wksId === null || wksId === undefined ? 'work' : String(wksId));

export default function StatementManagementPage() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const { activeWork, works } = useWorkScope();
  const socket = useSocket();
  const perms = permissionsCatalog.billing?.statementManagement;
  const canDo = (perId) => perId != null && hasPermission(perId);
  const canManageFunds = canDo(perms?.manageFunds);
  const canManageMovements = canDo(perms?.manageMovements);
  const canExport = canDo(perms?.export);

  const allWorks = activeWork === ALL_WORKS;
  const [pickedWork, setPickedWork] = useState('');
  const wrkId = allWorks ? pickedWork || null : activeWork;

  const [management, setManagement] = useState(null);
  const [tab, setTab] = useState(null);
  const [report, setReport] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);
  const outletContext = useMemo(() => ({ returnTo: STATEMENT_MANAGEMENT_PATH, refresh: reload }), [reload]);

  const [fundDialog, setFundDialog] = useState(null); // { fund } (null para crear)
  const [movementDialog, setMovementDialog] = useState(null); // { mode, extract?, movement? }
  const [invoicesOf, setInvoicesOf] = useState(null);
  const [confirming, setConfirming] = useState(null); // { kind: 'movement', item }

  // Cambió algo en otra sesión.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-statement-management', reload);
    return () => socket.off('refresh-statement-management', reload);
  }, [socket, reload]);

  // Los ámbitos de la obra; se conserva la pestaña si sigue existiendo.
  useEffect(() => {
    if (!wrkId) {
      setManagement(null);
      setReport(null);
      return undefined;
    }
    let cancelled = false;
    getManagementAPI(wrkId)
      .then(({ data }) => {
        if (cancelled) return;
        setManagement(data);
        setTab((current) => (data.scopes.some((s) => scopeKey(s.wksId) === current) ? current : scopeKey(data.scopes[0]?.wksId)));
      })
      .catch((err) => !cancelled && showError(err.response?.data?.message || 'Error al cargar la obra'));
    return () => {
      cancelled = true;
    };
  }, [wrkId, reloadKey]);

  const current = management?.scopes.find((s) => scopeKey(s.wksId) === tab) ?? null;
  const currentWksId = current?.wksId ?? null;

  useEffect(() => {
    if (!wrkId || !current) {
      setReport(null);
      return undefined;
    }
    let cancelled = false;
    getScopeReportAPI(wrkId, currentWksId)
      .then(({ data }) => !cancelled && setReport(data))
      .catch((err) => !cancelled && showError(err.response?.data?.message || 'Error al cargar el cuadro'));
    return () => {
      cancelled = true;
    };
    // `current` cambia de objeto en cada carga; basta con la pestaña y la recarga.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrkId, tab, currentWksId, reloadKey, management]);

  const acts = useMemo(() => (report ? report.movements.filter((m) => m.type !== 'PAYMENT') : []), [report]);

  const confirmDelete = async () => {
    const { item } = confirming;
    try {
      const { data } = await deleteFundMovementAPI(item.fmvId);
      showSuccess(data.message);
      setConfirming(null);
      reload();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo eliminar');
    }
  };

  const closeAndReload = (setter) => () => {
    setter(null);
    reload();
  };

  const summary = report?.summary;
  const fund = report?.fund;
  const work = management?.work;

  return (
    <MainCard>
      {allWorks && (
        <Box sx={{ maxWidth: 420, mb: 2 }}>
          <SearchSelect value={pickedWork} onChange={setPickedWork} options={works} label="Obra" placeholder="Elige la obra" />
        </Box>
      )}
      {!wrkId && (
        <Alert severity="info">
          {allWorks ? 'Elige la obra cuyos extractos quieres ver.' : 'Elige una obra en el encabezado para ver sus extractos.'}
        </Alert>
      )}

      {wrkId && management && (
        <Stack spacing={2}>
          <Tabs value={tab ?? false} onChange={(_, value) => setTab(value)} variant="scrollable" allowScrollButtonsMobile>
            {management.scopes.map((s) => (
              <Tab
                key={scopeKey(s.wksId)}
                value={scopeKey(s.wksId)}
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{s.name}</span>
                    {s.pendingCount > 0 && <Chip size="small" color="warning" label={s.pendingCount} />}
                  </Stack>
                }
              />
            ))}
          </Tabs>

          {report && (
            <Stack spacing={2}>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Figure
                    label="Lo que lleva la obra (acumulado de actas)"
                    value={fMoneyText(summary.extractsValue)}
                    hint={`${summary.actsCount} acta(s) aprobada(s) · ${report.pending.length} por aprobar, ${fMoneyText(summary.pendingValue)}`}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Figure
                    label="Se le debe a la constructora"
                    value={fMoneyText(summary.owed)}
                    hint={`${summary.actsCount - summary.paidActs} acta(s) sin abono`}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Figure label="Saldo del fondo rotatorio" value={fMoneyText(summary.balance)} hint="Abonos − amortizaciones" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Figure
                    label="Tope del fondo"
                    value={fund ? fMoneyText(summary.limit) : 'Sin fondo'}
                    hint={fund ? (fund.description ?? undefined) : 'Créalo para registrar abonos'}
                  />
                </Grid>
                {fund && (
                  <>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                      <Figure
                        label="Total abonos al fondo"
                        value={fMoneyText(summary.payments)}
                        hint={`${summary.paymentsCount} abono(s)`}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                      <Figure label="Total pagos actas especiales" value={fMoneyText(summary.specialPayments)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                      <Figure label="Total pagos por la fiducia" value={fMoneyText(summary.fiduciary)} hint="Abonos + pagos especiales" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                      <Figure label="Actas que amortizan el fondo" value={fMoneyText(summary.amortized)} />
                    </Grid>
                  </>
                )}
              </Grid>

              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, justifyContent: 'flex-end' }}>
                {canManageFunds && !fund && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<IconPlus size={16} />}
                    onClick={() => setFundDialog({ fund: null })}
                  >
                    Crear fondo rotatorio
                  </Button>
                )}
                {/* El fondo no se elimina desde la vista: solo se cambia su tope. */}
                {canManageFunds && fund && (
                  <Button size="small" startIcon={<IconEdit size={16} />} onClick={() => setFundDialog({ fund })}>
                    Cambiar tope
                  </Button>
                )}
                {canExport && (
                  <ExportButton
                    request={(format) => exportScopeReportAPI(Number(wrkId), currentWksId, format)}
                    fileName={['gerencia-extractos', work.code, current?.name].filter(Boolean).join('-')}
                  />
                )}
                {/* Abono al fondo (exige el fondo) o acta especial escrita a mano (no lo exige). */}
                {canManageMovements && (
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    startIcon={<IconPlus size={16} />}
                    onClick={() => setMovementDialog({ mode: 'payment' })}
                  >
                    Nuevo abono / especial
                  </Button>
                )}
              </Stack>

              <Box>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={1}
                  sx={{ justifyContent: 'space-between', alignItems: { md: 'center' }, mb: 1 }}
                >
                  <Typography variant="h5">Control de pagos</Typography>
                  <PaymentLegend />
                </Stack>
                <FundTable
                  report={report}
                  canManage={canManageMovements}
                  onEdit={(row) => setMovementDialog({ mode: 'edit', movement: row })}
                  onDelete={(row) => setConfirming({ kind: 'movement', item: row })}
                  onShowInvoices={setInvoicesOf}
                  wrkId={Number(wrkId)}
                  wksId={currentWksId}
                  onSaved={reload}
                />
              </Box>
            </Stack>
          )}
        </Stack>
      )}

      <FundDialog
        open={Boolean(fundDialog)}
        wrkId={wrkId ? Number(wrkId) : undefined}
        scope={current}
        fund={fundDialog?.fund ?? null}
        onClose={() => setFundDialog(null)}
        onSaved={closeAndReload(setFundDialog)}
      />
      <MovementDialog
        open={Boolean(movementDialog)}
        mode={movementDialog?.mode}
        wrkId={wrkId ? Number(wrkId) : undefined}
        wksId={currentWksId ?? undefined}
        extract={movementDialog?.extract ?? null}
        movement={movementDialog?.movement ?? null}
        acts={acts}
        nextPaymentNumber={report?.nextPaymentNumber}
        hasFund={Boolean(report?.fund)}
        onClose={() => setMovementDialog(null)}
        onSaved={closeAndReload(setMovementDialog)}
      />
      <ActInvoicesDialog act={invoicesOf} onClose={() => setInvoicesOf(null)} />
      {/* La factura elegida se abre encima (ruta hija, como en extractos); cerrar vuelve aquí. */}
      <Outlet context={outletContext} />
      <ConfirmDialog
        open={Boolean(confirming)}
        onClose={() => setConfirming(null)}
        onConfirm={confirmDelete}
        title={`Eliminar ${confirming?.item.typeName?.toLowerCase() ?? ''}`}
        message={confirmMessage(confirming)}
        confirmLabel="Eliminar"
        confirmColor="error"
      />
    </MainCard>
  );
}
