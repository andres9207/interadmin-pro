import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DataTable from 'ui-component/extended/DataTable';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { invoicePath } from 'utils/constants';

/**
 * Las facturas de un acta o de un extracto por aprobar (DEC-103): las de la
 * obra con ese texto en su campo Extracto y de la etapa. El total (sin las
 * anuladas) es el valor del acta; lo calcula el servidor.
 */

const COLUMNS = [
  {
    id: 'number',
    label: 'Factura',
    render: (row) => (
      <Link component={RouterLink} to={invoicePath(row.pvtId, row.invId)}>
        {row.number}
      </Link>
    )
  },
  { id: 'providerName', label: 'Proveedor' },
  { id: 'menuName', label: 'Menú' },
  { id: 'contractNumber', label: 'Contrato', render: (row) => row.contractNumber ?? '—' },
  { id: 'date', label: 'Fecha', render: (row) => fDateOnly(row.date) },
  { id: 'voucherNumber', label: 'Comprobante', render: (row) => row.voucherNumber ?? '—' },
  { id: 'amount', label: 'Total', align: 'right', render: (row) => fMoneyText(row.amount) },
  { id: 'stateName', label: 'Estado' }
];

export default function ActInvoicesDialog({ act, onClose }) {
  const invoices = act?.invoices ?? [];
  const total = act?.total ?? act?.actValue;
  const registered = act?.registered ?? act?.registeredInvoices ?? 0;
  return (
    <BaseDialog
      open={Boolean(act)}
      onClose={onClose}
      title={act ? `Facturas del extracto ${act.number}` : ''}
      maxWidth="lg"
      fullScreenOnMobile
      actions={<Button onClick={onClose}>Cerrar</Button>}
    >
      {act && (
        <Stack spacing={2}>
          {registered > 0 && (
            <Alert severity="warning">
              {registered === 1 ? 'Una factura está' : `${registered} facturas están`} sin aprobar: cuentan en el valor del acta.
            </Alert>
          )}
          {invoices.length === 0 ? (
            <Alert severity="info">Ya no hay facturas con este extracto: el acta vale 0.</Alert>
          ) : (
            <DataTable columns={COLUMNS} rows={invoices} keyExtractor={(row) => row.invId} />
          )}
          <Typography variant="h5" sx={{ textAlign: 'right' }}>
            Total {fMoneyText(total)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
            Las anuladas se listan pero no suman.
          </Typography>
        </Stack>
      )}
    </BaseDialog>
  );
}

ActInvoicesDialog.propTypes = {
  /** Un acta del cuadro o un extracto por aprobar: `{ number, invoices, total | actValue }`; null, cerrado. */
  act: PropTypes.object,
  onClose: PropTypes.func.isRequired
};
