import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconChevronDown, IconChevronRight, IconDeviceFloppy, IconEdit, IconFileInvoice, IconTrash } from '@tabler/icons-react';

import MoneyField from 'ui-component/extended/MoneyField';
import { saveFundMovementAPI } from 'api/requests/statementManagementApi';
import { showError, showSuccess } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * El cuadro "Control de pagos" de Intervé (DEC-103). Una fila por mes (el de
 * la factura más reciente de cada extracto) con lo pagado por la fiducia y el
 * acumulado mensual de las actas, que se despliega en sus extractos y abonos;
 * el último mes, desplegado. Cada extracto es una fila: si ya es acta, con sus
 * cifras; si no, con sus campos vacíos (fecha acta, fecha aprobación y tipo,
 * y en la especial la retención y la amortización), que se llenan en la celda
 * y se guardan desde la fila. Las cifras llegan calculadas del servidor.
 */

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
/** "2026-10" → "oct-26", como el cuadro. */
export const monthLabel = (month) => `${MONTHS[Number(month.slice(5, 7)) - 1]}-${month.slice(2, 4)}`;

/** "2026-10-05" → "05/10/26". */
const shortDate = (value) => {
  if (!value) return '';
  const [y, m, d] = String(value).slice(0, 10).split('-');
  return `${d}/${m}/${y.slice(2)}`;
};

/** Pesos sin los decimales cuando son cero, como el cuadro. */
const money = (value) => (value == null ? '' : fMoneyText(value).replace(/,00$/, ''));
const isAct = (row) => row.type !== 'PAYMENT';
const negative = (value) => (Number(value) < 0 ? 'error.main' : undefined);
const dateOf = (value) => String(value ?? '').slice(0, 10);

const rowLabel = (row) => `${isAct(row) ? 'Acta' : 'Abono'} ${row.number}`;

const paymentLabel = (row) => {
  if (isAct(row)) return row.paidByNumber ? `Pagada con el abono ${row.paidByNumber}` : `Por pagar ${money(row.owed)}`;
  return row.paidNumber ? `Paga el acta ${row.paidNumber}` : 'Entrega al fondo';
};

const glossItems = (row) => row.glosses?.items ?? [];

const HEADERS = [
  { label: 'Mes' },
  { label: 'Acta N°' },
  { label: 'Fecha acta' },
  { label: 'Fecha aprob.' },
  { label: '', title: 'A acta · E especial · F abono' },
  { label: 'Fondo rotat. (F) especiales (E) actas (A)' },
  { label: 'Retenc. pagos espec.' },
  { label: 'Valor actas' },
  { label: 'Amortización fondo' },
  { label: 'Saldo fondo rotatorio' },
  { label: 'Acumulado mensual actas' },
  { label: 'Glosa' },
  { label: 'Valor' }
];

/** Colores del cuadro, con las claves del tema para que sirvan en claro y oscuro. */
const useTones = () => {
  const theme = useTheme();
  return {
    payment: alpha(theme.palette.grey[500], 0.18),
    paid: alpha(theme.palette.warning.dark, 0.28),
    pending: alpha(theme.palette.warning.main, 0.08),
    month: alpha(theme.palette.primary.main, 0.06),
    light: alpha(theme.palette.primary.main, 0.12),
    fiduciary: { bgcolor: theme.palette.grey[600], color: theme.palette.common.white },
    balance: { bgcolor: theme.palette.secondary.dark, color: theme.palette.common.white }
  };
};

export function PaymentLegend() {
  const tones = useTones();
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
      <Chip size="small" label="Por aprobar: llena sus campos en la fila" sx={{ bgcolor: tones.pending }} />
      <Chip size="small" label="Amortización pagada con abono" sx={{ bgcolor: tones.paid }} />
      <Chip size="small" label="Abono" sx={{ bgcolor: tones.payment }} />
      <Chip size="small" variant="outlined" label="A acta · E especial · F abono" />
    </Stack>
  );
}

const num = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };
const cellInput = { minWidth: 130 };

function InvoicesButton({ row, onShowInvoices }) {
  return (
    <Tooltip title="Ver facturas">
      <IconButton size="small" color="info" onClick={() => onShowInvoices(row)} aria-label={`Ver facturas del extracto ${row.number}`}>
        <IconFileInvoice size={16} />
      </IconButton>
    </Tooltip>
  );
}

InvoicesButton.propTypes = { row: PropTypes.object.isRequired, onShowInvoices: PropTypes.func.isRequired };

/** Un acta o un abono ya registrados. */
function MovementRow({ row, tones, monthCell, accumulatedCell, canManage, onEdit, onDelete, onShowInvoices }) {
  const glosses = glossItems(row);
  const act = isAct(row);
  return (
    <TableRow sx={{ bgcolor: act ? undefined : tones.payment }}>
      {monthCell}
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{rowLabel(row)}</TableCell>
      <TableCell sx={num}>{shortDate(row.documentDate)}</TableCell>
      <TableCell sx={num}>{shortDate(row.approvalDate)}</TableCell>
      <TableCell align="center">
        <Tooltip title={row.typeName}>
          <Typography variant="subtitle2" component="span">
            {row.letter}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell align="right" sx={num}>
        {money(row.fiduciary)}
      </TableCell>
      <TableCell align="right" sx={num}>
        {money(row.withholding)}
      </TableCell>
      <TableCell align="right" sx={num}>
        {money(row.actValue)}
      </TableCell>
      <Tooltip title={paymentLabel(row)}>
        <TableCell align="right" sx={{ ...num, bgcolor: act && row.paidById ? tones.paid : undefined }}>
          {money(row.amortization)}
        </TableCell>
      </Tooltip>
      <TableCell align="right" sx={{ ...num, color: negative(row.balanceAfter) }}>
        {money(row.balanceAfter)}
      </TableCell>
      {accumulatedCell}
      <TableCell sx={{ minWidth: 120 }}>
        {glosses.map((g, i) => (
          <Typography key={`${g.state}-${i}`} variant="caption" component="div">
            Glosa {g.statement ?? ''} {g.state}
          </Typography>
        ))}
      </TableCell>
      <TableCell align="right" sx={num}>
        {glosses.map((g, i) => (
          <Typography key={`${g.state}-${i}`} variant="caption" component="div">
            {money(g.value)}
          </Typography>
        ))}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {act && <InvoicesButton row={row} onShowInvoices={onShowInvoices} />}
        {canManage && (
          <>
            <Tooltip title="Editar">
              <IconButton size="small" color="secondary" onClick={() => onEdit(row)} aria-label={`Editar ${rowLabel(row)}`}>
                <IconEdit size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" color="error" onClick={() => onDelete(row)} aria-label={`Eliminar ${rowLabel(row)}`}>
                <IconTrash size={16} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

MovementRow.propTypes = {
  row: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired,
  monthCell: PropTypes.node,
  accumulatedCell: PropTypes.node,
  canManage: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShowInvoices: PropTypes.func.isRequired
};

/** Faltan datos para guardar la fila: el texto dice cuáles. */
const missingOf = (form) => {
  const missing = [];
  if (!form.documentDate) missing.push('fecha acta');
  if (!form.approvalDate) missing.push('fecha aprob.');
  if (!form.type) missing.push('tipo');
  if (form.type === 'SPECIAL' && !form.withholding) missing.push('retención');
  if (form.type === 'SPECIAL' && !form.amortization) missing.push('amortización');
  return missing;
};

/** Un extracto que todavía no es acta: sus campos vacíos se llenan en la celda. */
function PendingRow({ extract, tones, monthCell, accumulatedCell, canManage, wrkId, wksId, onSaved, onShowInvoices }) {
  const [form, setForm] = useState({
    documentDate: dateOf(extract.lastDate),
    approvalDate: '',
    type: '',
    withholding: '',
    amortization: ''
  });
  // Una clave por fila: un doble clic o un reintento no crea dos actas (DEC-016).
  const [idempotencyKey] = useState(() => newIdempotencyKey());
  const [saving, setSaving] = useState(false);
  const set = (field) => (value) => setForm((current) => ({ ...current, [field]: value }));
  const special = form.type === 'SPECIAL';
  const missing = missingOf(form);

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await saveFundMovementAPI(
        {
          wrkId,
          wksId: wksId ?? null,
          type: form.type,
          number: extract.number,
          documentDate: form.documentDate,
          approvalDate: form.approvalDate,
          value: null,
          withholding: special ? form.withholding : null,
          amortization: special ? form.amortization : null,
          paidId: null,
          description: ''
        },
        idempotencyKey
      );
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar el acta');
    } finally {
      setSaving(false);
    }
  };

  const dateInput = (field, label) =>
    canManage ? (
      <TextField
        type="date"
        size="small"
        variant="standard"
        value={form[field]}
        onChange={(e) => set(field)(e.target.value)}
        slotProps={{ htmlInput: { 'aria-label': `${label} del extracto ${extract.number}` } }}
        sx={{ minWidth: 120 }}
      />
    ) : null;

  return (
    <TableRow sx={{ bgcolor: tones.pending }}>
      {monthCell}
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Tooltip title={`Extracto ${extract.number} · ${extract.invoicesCount} factura(s), por aprobar como acta`}>
          <span>Acta {extract.number}</span>
        </Tooltip>
      </TableCell>
      <TableCell>{dateInput('documentDate', 'Fecha acta')}</TableCell>
      <TableCell>{dateInput('approvalDate', 'Fecha de aprobación')}</TableCell>
      <TableCell align="center">
        {canManage && (
          <TextField
            select
            size="small"
            variant="standard"
            value={form.type}
            onChange={(e) => set('type')(e.target.value)}
            slotProps={{ htmlInput: { 'aria-label': `Tipo del extracto ${extract.number}` } }}
            sx={{ minWidth: 48 }}
          >
            <MenuItem value="NORMAL">A</MenuItem>
            <MenuItem value="SPECIAL">E</MenuItem>
          </TextField>
        )}
      </TableCell>
      <TableCell align="right" sx={num}>
        {special ? money(extract.total) : ''}
      </TableCell>
      <TableCell align="right" sx={special ? cellInput : num}>
        {special && <MoneyField label="" value={form.withholding} onChange={set('withholding')} />}
      </TableCell>
      <TableCell align="right" sx={num}>
        {money(extract.total)}
      </TableCell>
      <TableCell align="right" sx={special ? cellInput : num}>
        {special && <MoneyField label="" value={form.amortization} onChange={set('amortization')} />}
        {form.type === 'NORMAL' && money(extract.total)}
      </TableCell>
      <TableCell />
      {accumulatedCell}
      <TableCell />
      <TableCell />
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        <InvoicesButton row={extract} onShowInvoices={onShowInvoices} />
        {canManage && (
          <Tooltip title={missing.length ? `Falta: ${missing.join(', ')}` : 'Guardar como acta'}>
            <span>
              <IconButton
                size="small"
                color="success"
                disabled={missing.length > 0 || saving}
                onClick={save}
                aria-label={`Guardar el extracto ${extract.number} como acta`}
              >
                <IconDeviceFloppy size={16} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}

PendingRow.propTypes = {
  extract: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired,
  monthCell: PropTypes.node,
  accumulatedCell: PropTypes.node,
  canManage: PropTypes.bool,
  wrkId: PropTypes.number,
  wksId: PropTypes.number,
  onSaved: PropTypes.func.isRequired,
  onShowInvoices: PropTypes.func.isRequired
};

/** Las filas de un mes en orden: actas y extractos por su factura más reciente, abonos por su aprobación. */
const monthRows = (month, movements, pending) =>
  [
    ...movements
      .filter((r) => r.month === month)
      .map((r) => ({ kind: 'movement', key: `m${r.fmvId}`, date: dateOf(r.rowDate ?? r.approvalDate), row: r })),
    ...pending.filter((p) => p.month === month).map((p) => ({ kind: 'pending', key: `p${p.number}`, date: dateOf(p.lastDate), row: p }))
  ].sort((a, b) => a.date.localeCompare(b.date));

export default function FundTable({ report, canManage, onEdit, onDelete, onShowInvoices, wrkId, wksId, onSaved }) {
  const tones = useTones();
  const { months, movements, pending, summary } = report;
  const lastMonth = months[months.length - 1]?.month;
  const [open, setOpen] = useState(() => new Set(lastMonth ? [lastMonth] : []));

  // Al cambiar de ámbito o llegar un mes nuevo, el último queda desplegado.
  useEffect(() => {
    if (lastMonth) setOpen((current) => (current.has(lastMonth) ? current : new Set([...current, lastMonth])));
  }, [lastMonth]);

  const toggle = (month) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(month)) next.delete(month);
      else next.add(month);
      return next;
    });

  if (months.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="subtitle1">Todavía no hay extractos ni abonos.</Typography>
        <Typography variant="body2" color="text.secondary">
          Un extracto aparece aquí cuando una factura de este ámbito lo tiene escrito en su campo Extracto.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Table
        size="small"
        aria-label="Control de pagos"
        sx={{ '& td, & th': { border: '1px solid', borderColor: 'divider', py: 0.5, px: 1 }, '& td': { fontSize: '0.8rem' } }}
      >
        <TableHead>
          <TableRow>
            {HEADERS.map((h) => (
              <TableCell
                key={h.label || 'type'}
                align="center"
                title={h.title}
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.72rem',
                  lineHeight: 1.2,
                  minWidth: h.label.length > 14 ? 120 : undefined
                }}
              >
                {h.label}
              </TableCell>
            ))}
            <TableCell sx={{ width: 1 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {months.map((m) => {
            const expanded = open.has(m.month);
            const rows = expanded ? monthRows(m.month, movements, pending) : [];
            return (
              <Fragment key={m.month}>
                <TableRow
                  hover
                  onClick={() => toggle(m.month)}
                  sx={{ cursor: 'pointer', bgcolor: tones.month, '& td': { fontWeight: 700 } }}
                >
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {expanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                      <span>{monthLabel(m.month)}</span>
                    </Stack>
                  </TableCell>
                  <TableCell colSpan={4}>
                    {m.pendingCount > 0 && (
                      <Typography variant="caption" color="warning.dark" sx={{ fontWeight: 600 }}>
                        {m.pendingCount} por aprobar
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right" sx={num}>
                    {money(m.fiduciary)}
                  </TableCell>
                  <TableCell colSpan={4} />
                  <TableCell align="right" sx={num}>
                    {money(m.extractsValue)}
                  </TableCell>
                  <TableCell colSpan={3} />
                </TableRow>
                {rows.map((item, i) => {
                  // Mes y acumulado: una sola celda por mes, como la celda combinada del Excel.
                  const monthCell = i === 0 ? <TableCell rowSpan={rows.length} /> : null;
                  const accumulatedCell = i === 0 ? <TableCell rowSpan={rows.length} /> : null;
                  return item.kind === 'pending' ? (
                    <PendingRow
                      key={item.key}
                      extract={item.row}
                      tones={tones}
                      monthCell={monthCell}
                      accumulatedCell={accumulatedCell}
                      canManage={canManage}
                      wrkId={wrkId}
                      wksId={wksId ?? undefined}
                      onSaved={onSaved}
                      onShowInvoices={onShowInvoices}
                    />
                  ) : (
                    <MovementRow
                      key={item.key}
                      row={item.row}
                      tones={tones}
                      monthCell={monthCell}
                      accumulatedCell={accumulatedCell}
                      canManage={canManage}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onShowInvoices={onShowInvoices}
                    />
                  );
                })}
              </Fragment>
            );
          })}
          <TableRow sx={{ '& td': { fontWeight: 700, borderTop: '2px solid' } }}>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell align="right" sx={{ ...num, ...tones.fiduciary }}>
              {money(summary.fiduciary)}
            </TableCell>
            <TableCell align="right" sx={num}>
              {money(summary.withholdings)}
            </TableCell>
            <TableCell align="right" sx={{ ...num, bgcolor: tones.light }}>
              {money(summary.extractsValue)}
            </TableCell>
            <TableCell align="right" sx={{ ...num, bgcolor: tones.paid }}>
              {money(summary.amortized)}
            </TableCell>
            <TableCell align="right" sx={{ ...num, ...tones.balance }}>
              {money(summary.balance)}
            </TableCell>
            <TableCell align="right" sx={{ ...num, bgcolor: tones.light }}>
              {money(summary.extractsValue)}
            </TableCell>
            <TableCell colSpan={3} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

FundTable.propTypes = {
  /** El cuadro del servidor: `{ months, movements, pending, summary }`. */
  report: PropTypes.object.isRequired,
  canManage: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShowInvoices: PropTypes.func.isRequired,
  wrkId: PropTypes.number,
  wksId: PropTypes.number,
  onSaved: PropTypes.func.isRequired
};
