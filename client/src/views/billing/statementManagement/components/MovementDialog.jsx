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
 * - Acta especial escrita a mano (E, desde "Nuevo abono / especial"): sin
 *   facturas; se escriben su número, lo pagado por la fiducia, la retención y
 *   la amortización. Valor del acta = pagado por la fiducia + retención.
 * Al editar, el número no cambia; un acta de extracto pasa de A a E o al
 * revés mientras ningún abono la pague.
 */

const ACT_TYPES = [
  { value: 'NORMAL', label: 'Acta normal (A)' },
  { value: 'SPECIAL', label: 'Acta especial (E)' }
];

// "Nuevo abono / especial": lo que entra al fondo o lo que la fiducia pagó directo.
const FUND_TYPES = [
  { value: 'PAYMENT', label: 'Abono al fondo (F)' },
  { value: 'SPECIAL', label: 'Acta especial (E)' }
];

/** "1234.5" + "10" → "1244.50", en centavos con BigInt: sin Number sobre importes (DEC-045). */
const addMoney = (a, b) => {
  const cents = (v) => {
    const [int = '0', dec = ''] = String(v || '0').split('.');
    return BigInt(int || '0') * 100n + BigInt((dec + '00').slice(0, 2));
  };
  const total = cents(a) + cents(b);
  return `${total / 100n}.${String(total % 100n).padStart(2, '0')}`;
};

/**
 * Lo que se envía de cada tipo; lo que no le aplica va en null. `manual`: la
 * especial escrita a mano (con lo pagado por la fiducia y la amortización
 * igual a la retención, un solo campo). `newPayment`: el abono nuevo, cuyo
 * número asigna el servidor.
 */
const movementParams = (form, { manual, newPayment }) => {
  const payment = form.type === 'PAYMENT';
  const special = form.type === 'SPECIAL';
  let amortization = null;
  if (special) amortization = manual ? form.withholding : form.amortization;
  return {
    type: form.type,
    number: newPayment ? null : form.number.trim(),
    documentDate: form.documentDate,
    approvalDate: form.approvalDate,
    value: payment || manual ? form.value : null,
    withholding: special ? form.withholding : null,
    amortization,
    paidId: payment ? form.paidId || null : null,
    description: form.description.trim()
  };
};

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

/** Los valores con que se abre el formulario, según el modo. */
const initialValues = ({ mode, movement, extract, hasFund }) => {
  if (mode === 'edit') {
    return {
      type: movement.type,
      number: movement.number,
      documentDate: movement.documentDate,
      approvalDate: movement.approvalDate,
      // El abono y la especial escrita a mano guardan su valor; el acta de un extracto lo toma de sus facturas.
      value: movement.type === 'PAYMENT' || movement.manual ? (movement.value ?? '') : '',
      withholding: movement.withholding ?? '',
      amortization: movement.amortization ?? '',
      paidId: movement.paidId ?? '',
      description: movement.description ?? ''
    };
  }
  if (mode === 'approve') {
    // La fecha del documento propone la última factura del extracto; la aprobación, la de sus facturas o hoy.
    return {
      ...EMPTY,
      type: 'NORMAL',
      number: extract.number,
      documentDate: extract.lastDate ?? '',
      approvalDate: extract.approvalDate ?? today()
    };
  }
  // Sin fondo no hay abonos: se abre en la especial.
  return { ...EMPTY, type: hasFund ? 'PAYMENT' : 'SPECIAL', approvalDate: today(), documentDate: today() };
};

/**
 * Importes de la especial. Escrita a mano (`manual`): lo pagado por la
 * fiducia y un solo campo para la retención, que es también la amortización.
 * La de un extracto: la retención y la amortización por separado.
 */
function SpecialAmountFields({ control, manual, getValues, setValue }) {
  const required = (label) => ({ required: `${label} es requerida.` });
  return (
    <>
      {manual && (
        <Grid size={12}>
          <Controller
            name="value"
            control={control}
            rules={{ required: 'Lo pagado por la fiducia es requerido.' }}
            render={({ field, fieldState }) => (
              <MoneyField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label="Pagado por la fiducia"
                required
                error={fieldState.error?.message}
                helperText="Lo que la fiducia les pagó directo a los proveedores. No se le resta al fondo."
              />
            )}
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, sm: manual ? 12 : 6 }}>
        <Controller
          name="withholding"
          control={control}
          rules={required('La retención')}
          render={({ field, fieldState }) => (
            <MoneyField
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                // Lo habitual: se amortiza al fondo lo mismo que se retiene (se puede cambiar).
                if (!getValues('amortization') && getValues('withholding')) setValue('amortization', getValues('withholding'));
              }}
              label={manual ? 'Retención pagos especiales y amortización al fondo' : 'Retención pagos especiales'}
              required
              error={fieldState.error?.message}
              helperText={
                manual
                  ? 'Retefuente, reteICA, reteIVA, 4×1000…: lo que cobra la constructora, y lo que se le resta al fondo.'
                  : 'Retefuente, reteICA, reteIVA, 4×1000…: un solo valor.'
              }
            />
          )}
        />
      </Grid>
      {!manual && (
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
      )}
    </>
  );
}

SpecialAmountFields.propTypes = {
  control: PropTypes.object.isRequired,
  manual: PropTypes.bool,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

/** "Nuevo abono / especial": abono al fondo (F, exige el fondo) o acta especial escrita a mano (E). */
function PaymentTypeChoice({ control, hasFund }) {
  return (
    <>
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
            aria-label="Abono o acta especial"
          >
            {FUND_TYPES.map((t) => (
              <ToggleButton key={t.value} value={t.value} disabled={t.value === 'PAYMENT' && !hasFund}>
                {t.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />
      {!hasFund && (
        <Alert severity="warning" variant="outlined">
          Para registrar abonos, primero crea el fondo rotatorio. La especial no lo necesita.
        </Alert>
      )}
    </>
  );
}

PaymentTypeChoice.propTypes = { control: PropTypes.object.isRequired, hasFund: PropTypes.bool };

/**
 * `mode`: 'approve' (con `extract`, un extracto por aprobar), 'payment' (abono
 * nuevo) o 'edit' (con `movement`, una fila del cuadro).
 */
export default function MovementDialog({
  open,
  mode,
  wrkId,
  wksId,
  extract,
  movement,
  acts,
  nextPaymentNumber,
  hasFund = true,
  onClose,
  onSaved
}) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const editing = mode === 'edit';
  const { control, handleSubmit, reset, setValue, getValues } = useForm({ defaultValues: EMPTY });
  const type = useWatch({ control, name: 'type' });
  const payment = type === 'PAYMENT';
  // Especial escrita a mano: la nueva desde "Nuevo abono / especial" o la que se edita.
  const manual = type === 'SPECIAL' && ((mode === 'payment' && !editing) || Boolean(movement?.manual));
  const [fiduciary, withholding] = useWatch({ control, name: ['value', 'withholding'] });
  // Un acta que ya paga un abono no cambia de tipo (el servidor responde 409).
  const typeLocked = editing && Boolean(movement?.paidById);

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(editing ? null : newIdempotencyKey());
    reset(initialValues({ mode, movement, extract, hasFund }));
  }, [open, mode, editing, movement, extract, hasFund, reset]);

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
      const params = {
        ...(editing ? { fmvId: movement.fmvId } : { wrkId, wksId: wksId ?? null }),
        ...movementParams(form, { manual, newPayment: payment && !editing })
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
    payment: type === 'SPECIAL' ? 'Nueva acta especial' : 'Nuevo abono al fondo',
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
        {mode === 'payment' && <PaymentTypeChoice control={control} hasFund={hasFund} />}
        {!payment && !manual && (
          <Alert severity="info">
            El valor del acta es el total de las facturas del extracto: {fMoneyText(actTotal)}
            {mode === 'approve' && extract?.registered > 0 ? ` (${extract.registered} sin aprobar)` : ''}. Si cambian sus facturas, cambia
            el acta.
          </Alert>
        )}
        {/* El tipo se elige al aprobar y, en un acta, cambia al editarla (A ↔ E) mientras ningún abono la pague. */}
        {(mode === 'approve' || (editing && !payment && !movement?.manual)) && (
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
                disabled={typeLocked}
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
            {manual ? ' la retención.' : ' Amortización al fondo.'}
            {manual ? ` Valor del acta: ${fMoneyText(addMoney(fiduciary, withholding))} (pagado por la fiducia + retención).` : ''}
          </Alert>
        )}
        <Grid container spacing={2}>
          {payment && (
            <Grid size={{ xs: 12, sm: 4 }}>
              {/* Consecutivo del ámbito: lo asigna el servidor al guardar y no cambia. */}
              <TextField
                label="Abono N°"
                size="small"
                fullWidth
                value={editing ? (movement?.number ?? '') : (nextPaymentNumber ?? '')}
                helperText={editing ? 'No cambia' : 'Se asigna al guardar'}
                disabled
              />
            </Grid>
          )}
          {manual && (
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="number"
                control={control}
                rules={{ validate: (value, form) => (form.type !== 'SPECIAL' || value.trim() ? true : 'El número del acta es requerido.') }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Acta N°"
                    size="small"
                    fullWidth
                    required={!editing}
                    disabled={editing}
                    error={!!fieldState.error}
                    helperText={editing ? 'No cambia' : fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 20 } }}
                  />
                )}
              />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: payment || manual ? 4 : 6 }}>
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
          <Grid size={{ xs: 12, sm: payment || manual ? 4 : 6 }}>
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
          {type === 'SPECIAL' && <SpecialAmountFields control={control} manual={manual} getValues={getValues} setValue={setValue} />}
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
  /** Si el ámbito tiene fondo: sin él, "Nuevo abono / especial" solo registra la especial. */
  hasFund: PropTypes.bool,
  /** El número que el servidor le dará al abono nuevo. */
  nextPaymentNumber: PropTypes.string,
  /** El extracto por aprobar (modo 'approve'). */
  extract: PropTypes.object,
  /** La fila del cuadro que se edita (modo 'edit'). */
  movement: PropTypes.object,
  /** Las actas del cuadro, para elegir la que paga un abono. */
  acts: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
