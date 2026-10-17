import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'

import { Item } from '@entities/items/model'
import { env } from '@shared/config'

import { ItemsTableProps } from './interfaces'

const headCellSx = {
  bgcolor: 'grey.50',
  fontWeight: 600,
  color: 'text.secondary',
  borderBottomColor: 'divider',
  whiteSpace: 'nowrap',
} as const

export const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  loading = false,
  setDeleteItem,
  setChangeItem,
}) => {
  const navigate = useNavigate()

  const configureItem = (item: Item) => {
    navigate(`/configure/${item.id}`)
  }

  if (!loading && items.length === 0) {
    return (
      <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
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
      sx={{
        position: 'relative',
        minHeight: loading && !items.length ? 220 : undefined,
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.72)',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell align='right' sx={{ ...headCellSx, width: 72 }}>
              Поз.
            </TableCell>
            <TableCell sx={headCellSx}>Название</TableCell>
            <TableCell sx={headCellSx}>Бренд</TableCell>
            <TableCell sx={{ ...headCellSx, width: 160, maxWidth: 160 }}>
              Категория
            </TableCell>
            <TableCell align='right' sx={headCellSx}>
              Цена
            </TableCell>
            <TableCell sx={headCellSx}>Статус</TableCell>
            <TableCell align='right' sx={headCellSx}>
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              hover
              sx={{ '&:last-child td': { borderBottom: 0 } }}
            >
              <TableCell align='right' sx={{ width: 72 }}>
                <Typography variant='body2' color='text.secondary'>
                  {item.position}
                </Typography>
              </TableCell>

              <TableCell sx={{ maxWidth: 360 }}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {item.name || '—'}
                </Typography>
                {(item.code || item.url) && (
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      display: 'block',
                      mt: 0.25,
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {[item.code, item.url ? `/${item.url}` : '']
                      .filter(Boolean)
                      .join(' · ')}
                  </Typography>
                )}
              </TableCell>

              <TableCell sx={{ maxWidth: 160 }}>
                <Typography
                  variant='body2'
                  noWrap
                  sx={{
                    color: item.brand ? 'text.primary' : 'text.disabled',
                  }}
                >
                  {item.brand || '—'}
                </Typography>
              </TableCell>

              <TableCell sx={{ width: 160, maxWidth: 160 }}>
                {item.categoryName ? (
                  <Tooltip title={item.categoryName}>
                    <Typography
                      variant='body2'
                      noWrap
                      sx={{ maxWidth: 148 }}
                    >
                      {item.categoryName}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant='body2' color='text.disabled'>
                    —
                  </Typography>
                )}
              </TableCell>

              <TableCell align='right'>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {item.displayPrice || '—'}
                </Typography>
              </TableCell>

              <TableCell>
                <Stack
                  direction='row'
                  spacing={0.75}
                  useFlexGap
                  sx={{ flexWrap: 'wrap' }}
                >
                  <Chip
                    label={item.isActive ? 'Активен' : 'Скрыт'}
                    size='small'
                    color={item.isActive ? 'success' : 'default'}
                    variant={item.isActive ? 'filled' : 'outlined'}
                  />
                  <Chip
                    label={item.isOrderOnly ? 'Под заказ' : 'В наличии'}
                    size='small'
                    color={item.isOrderOnly ? 'warning' : 'default'}
                    variant='outlined'
                  />
                </Stack>
              </TableCell>

              <TableCell align='right'>
                <Box
                  sx={{
                    display: 'inline-flex',
                    gap: 0.25,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Tooltip title='Открыть на сайте'>
                    <IconButton
                      size='small'
                      component='a'
                      href={`${env.siteUrl}/menu/${item.categoryUrl}/${item.url}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <OpenInNewOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Настроить'>
                    <IconButton size='small' onClick={() => configureItem(item)}>
                      <TuneOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Изменить'>
                    <IconButton
                      size='small'
                      onClick={() => setChangeItem(item)}
                    >
                      <EditOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Удалить'>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => setDeleteItem(item)}
                    >
                      <DeleteOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
