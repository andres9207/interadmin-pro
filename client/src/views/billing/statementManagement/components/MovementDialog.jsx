import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import MoneyField from 'ui-component/extended/MoneyField';
import SearchSelect from 'ui-component/extended/SearchSelect';
import { saveFundMovementAPI } from 'api/requests/statementManagementApi';
import { showError, showSuccess } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Aprobar un extracto como acta, registrar un abono o editarlos (DEC-103).
 * - Acta (A) o acta especial (E): el extracto ya trae sus facturas, y su
 *   valor es el total de ellas (lo calcula el servidor). Se registra la fecha
 *   del documento, la de aprobación y, en la especial, la retención y la
 *   amortización al fondo, escritas a mano.
 * - Abono (F): lo entregado al fondo; puede pagar un acta (una sola).
 * Al editar, el tipo y el extracto de un acta no cambian.
 */

const ACT_TYPES = [
  { value: 'NORMAL', label: 'Acta normal (A)' },
  { value: 'SPECIAL', label: 'Acta especial (E)' }
];

const DESCRIPTION_MAX = 500;
const today = () => format(new Date(), 'yyyy-MM-dd');
const EMPTY = {
  type: 'NORMAL',
  number: '',
  documentDate: '',
  approvalDate: '',
  value: '',
  withholding: '',
  amortization: '',
  paidId: '',
  description: ''
};

/**
 * `mode`: 'approve' (con `extract`, un extracto por aprobar), 'payment' (abono
 * nuevo) o 'edit' (con `movement`, una fila del cuadro).
 */
export default function MovementDialog({ open, mode, wrkId, wksId, extract, movement, acts, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const editing = mode === 'edit';
  const { control, handleSubmit, reset, setValue, getValues } = useForm({ defaultValues: EMPTY });
  const type = useWatch({ control, name: 'type' });
  const payment = type === 'PAYMENT';

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(editing ? null : newIdempotencyKey());
    if (editing) {
      reset({
        type: movement.type,
        number: movement.number,
        documentDate: movement.documentDate,
        approvalDate: movement.approvalDate,
        value: movement.type === 'PAYMENT' ? (movement.value ?? '') : '',
        withholding: movement.withholding ?? '',
        amortization: movement.amortization ?? '',
        paidId: movement.paidId ?? '',
        description: movement.description ?? ''
      });
    } else if (mode === 'approve') {
      // La fecha del documento propone la última factura del extracto; la aprobación, hoy.
      reset({ ...EMPTY, type: 'NORMAL', number: extract.number, documentDate: extract.lastDate ?? '', approvalDate: today() });
    } else {
      reset({ ...EMPTY, type: 'PAYMENT', approvalDate: today(), documentDate: today() });
    }
  }, [open, mode, editing, movement, extract, reset]);

  // Actas que el abono puede pagar: las que no tienen abono, y la que ya paga este.
  const actOptions = useMemo(
    () =>
      acts
        .filter((a) => !a.paidById || a.paidById === movement?.fmvId)
        .map((a) => ({
          value: a.fmvId,
          label: `${a.typeName} ${a.number} · amortiza ${fMoneyText(a.amortization)}`,
          owed: a.paidById ? a.amortization : a.owed
        })),
    [acts, movement]
  );

  // Al elegir el acta, el valor del abono propone lo que le falta pagar (lo calculó el servidor).
  const choosePaidAct = (value, onChange) => {
    onChange(value);
    const act = actOptions.find((o) => o.value === value);
    if (act && !getValues('value')) setValue('value', act.owed);
  };

  const save = async (form) => {
    setSaving(true);
    try {
      const special = form.type === 'SPECIAL';
      const params = {
        ...(editing ? { fmvId: movement.fmvId } : { wrkId, wksId: wksId ?? null }),
        type: form.type,
        number: form.number.trim(),
        documentDate: form.documentDate,
        approvalDate: form.approvalDate,
        value: form.type === 'PAYMENT' ? form.value : null,
        withholding: special ? form.withholding : null,
        amortization: special ? form.amortization : null,
        paidId: form.type === 'PAYMENT' ? form.paidId || null : null,
        description: form.description.trim()
      };
      const { data } = await saveFundMovementAPI(params, idempotencyKey);
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  const titles = {
    approve: `Aprobar el extracto ${extract?.number ?? ''} como acta`,
    payment: 'Nuevo abono al fondo',
    edit: `Editar ${movement?.typeName?.toLowerCase() ?? ''} ${movement?.number ?? ''}`
  };
  const actTotal = mode === 'approve' ? extract?.total : (movement?.fiduciary ?? movement?.actValue);
  const required = (label) => ({ required: `${label} es requerida.` });
  const submitLabel = mode === 'approve' ? 'Aprobar acta' : 'Guardar';

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={titles[mode] ?? ''}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Guardando…' : submitLabel}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        {!payment && (
          <Alert severity="info">
            El valor del acta es el total de las facturas del extracto: {fMoneyText(actTotal)}
            {mode === 'approve' && extract?.registered > 0 ? ` (${extract.registered} sin aprobar)` : ''}. Si cambian sus facturas, cambia
            el acta.
          </Alert>
        )}
        {mode === 'approve' && (
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                exclusive
                fullWidth
                size="small"
                color="secondary"
                value={field.value}
                onChange={(_, value) => value && field.onChange(value)}
                aria-label="Tipo de acta"
              >
                {ACT_TYPES.map((t) => (
                  <ToggleButton key={t.value} value={t.value}>
                    {t.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
        )}
        {type === 'SPECIAL' && (
          <Alert severity="info" variant="outlined">
            En el acta especial, la fiducia pagó las facturas directo a los proveedores. Al fondo solo se le resta lo que escribas en
            Amortización al fondo.
          </Alert>
        )}
        <Grid container spacing={2}>
          {payment && (
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="number"
                control={control}
                rules={{ validate: (value) => (value.trim() ? true : 'El número es requerido.') }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Abono N°"
                    size="small"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 20 } }}
                  />
                )}
              />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: payment ? 4 : 6 }}>
            <Controller
              name="documentDate"
              control={control}
              rules={required('La fecha del documento')}
              render={({ field, fieldState }) => (
                <DateField
                  value={field.value}
                  onChange={field.onChange}
                  label={payment ? 'Fecha de solicitud' : 'Fecha del acta'}
                  required
                  error={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: payment ? 4 : 6 }}>
            <Controller
              name="approvalDate"
              control={control}
              rules={{
                ...required('La fecha de aprobación'),
                validate: (value, form) =>
                  form.documentDate && value && value < form.documentDate ? 'No puede ser anterior a la del documento.' : true
              }}
              render={({ field, fieldState }) => (
                <DateField
                  value={field.value}
                  onChange={field.onChange}
                  label="Fecha de aprobación"
                  required
                  minDate={getValues('documentDate') || undefined}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          {payment && (
            <>
              <Grid size={12}>
                <Controller
                  name="paidId"
                  control={control}
                  render={({ field }) => (
                    <SearchSelect
                      value={field.value}
                      onChange={(value) => choosePaidAct(value, field.onChange)}
                      options={actOptions}
                      label="Acta que paga"
                      helperText="Un abono paga una sola acta. Vacío: es una entrega al fondo (p. ej. la inicial)."
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="value"
                  control={control}
                  rules={{ required: 'El valor del abono es requerido.' }}
                  render={({ field, fieldState }) => (
                    <MoneyField
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      label="Valor del abono"
                      required
                      error={fieldState.error?.message}
                      helperText="Lo que se le entrega a la constructora."
                    />
                  )}
                />
              </Grid>
            </>
          )}
          {type === 'SPECIAL' && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="withholding"
                  control={control}
                  rules={required('La retención')}
                  render={({ field, fieldState }) => (
                    <MoneyField
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      label="Retención pagos especiales"
                      required
                      error={fieldState.error?.message}
                      helperText="Retefuente, reteICA, reteIVA, 4×1000…: un solo valor."
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="amortization"
                  control={control}
                  rules={required('La amortización al fondo')}
                  render={({ field, fieldState }) => (
                    <MoneyField
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      label="Amortización al fondo"
                      required
                      error={fieldState.error?.message}
                      helperText="Lo que esta acta le resta al fondo."
                    />
                  )}
                />
              </Grid>
            </>
          )}
          <Grid size={12}>
            <Controller
              name="description"
              control={control}
              rules={{ maxLength: { value: DESCRIPTION_MAX, message: `Máximo ${DESCRIPTION_MAX} caracteres.` } }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  multiline
                  minRows={2}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: DESCRIPTION_MAX } }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>
    </BaseDialog>
  );
}

MovementDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['approve', 'payment', 'edit']),
  wrkId: PropTypes.number,
  wksId: PropTypes.number,
  /** El extracto por aprobar (modo 'approve'). */
  extract: PropTypes.object,
  /** La fila del cuadro que se edita (modo 'edit'). */
  movement: PropTypes.object,
  /** Las actas del cuadro, para elegir la que paga un abono. */
  acts: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
