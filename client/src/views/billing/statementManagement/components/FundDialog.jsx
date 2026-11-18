import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import MoneyField from 'ui-component/extended/MoneyField';
import { saveFundAPI } from 'api/requests/statementManagementApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Crear el fondo rotatorio de la obra o de una etapa (el ámbito de la
 * pestaña), o cambiar su tope (DEC-103). El ámbito no cambia después.
 */
const DESCRIPTION_MAX = 500;

export default function FundDialog({ open, wrkId, scope, fund, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const editing = Boolean(fund);
  const { control, handleSubmit, reset } = useForm({ defaultValues: { limit: '', description: '' } });

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(editing ? null : newIdempotencyKey());
    reset({ limit: fund?.limit ?? '', description: fund?.description ?? '' });
  }, [open, editing, fund, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const params = editing
        ? { rfdId: fund.rfdId, limit: form.limit, description: form.description.trim() }
        : { wrkId, wksId: scope?.wksId ?? null, limit: form.limit, description: form.description.trim() };
      const { data } = await saveFundAPI(params, idempotencyKey);
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar el fondo rotatorio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={editing ? 'Cambiar tope del fondo' : `Fondo rotatorio · ${scope?.name ?? ''}`}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Controller
          name="limit"
          control={control}
          rules={{ required: 'El tope del fondo es requerido.' }}
          render={({ field, fieldState }) => (
            <MoneyField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="Tope del fondo"
              required
              error={fieldState.error?.message}
              helperText="Lo que la gerencia aprueba entregarle a la constructora. Cambiarlo queda en la bitácora."
            />
          )}
        />
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
      </Stack>
    </BaseDialog>
  );
}

FundDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  wrkId: PropTypes.number,
  /** El ámbito de la pestaña: `{ wksId, name }`. */
  scope: PropTypes.object,
  /** El fondo que se edita; null para crear. */
  fund: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
