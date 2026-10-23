import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'

import { ItemsTableProps } from './interfaces'
import { ItemRow } from './ui/ItemRow'

import s from './styles.module.scss'

export const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  loading = false,
  setDeleteItem,
  setChangeItem,
  setCopyItem,
}) => {
  const navigate = useNavigate()

  if (!loading && items.length === 0) {
    return (
      <Paper variant='outlined' className={s.empty}>
        <Typography color='text.secondary'>
          Товаров не найдено — измените фильтр или добавьте позицию
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer
      component={Paper}
      variant='outlined'
      className={[s.table, loading && !items.length && s.tableMin]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && (
        <Box className={s.overlay}>
          <CircularProgress />
        </Box>
      )}

      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell
              align='right'
              className={[s.headCell, s.colPosition].join(' ')}
            >
              Поз.
            </TableCell>
            <TableCell className={s.headCell}>Название</TableCell>
            <TableCell className={s.headCell}>Бренд</TableCell>
            <TableCell className={[s.headCell, s.colCategory].join(' ')}>
              Категория
            </TableCell>
            <TableCell align='right' className={s.headCell}>
              Цена
            </TableCell>
            <TableCell className={s.headCell}>Статус</TableCell>
            <TableCell align='right' className={s.headCell}>
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onConfigure={() => navigate(`/configure/${item.id}`)}
              onEdit={() => setChangeItem(item)}
              onCopy={() => setCopyItem(item)}
              onDelete={() => setDeleteItem(item)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
