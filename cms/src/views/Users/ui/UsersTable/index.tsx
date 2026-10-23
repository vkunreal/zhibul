import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import { getDate } from '@shared/utils'

import { UsersTableProps } from './interfaces'

import s from './styles.module.scss'

export const UsersTable = ({ users, loading, onDelete }: UsersTableProps) => {
  if (!loading && users.length === 0) {
    return (
      <Paper variant='outlined' className={s.empty}>
        <Typography color='text.secondary'>Пользователей пока нет</Typography>
      </Paper>
    )
  }

  return (
    <TableContainer
      component={Paper}
      variant='outlined'
      className={[s.table, loading && !users.length && s.tableLoading]
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
            <TableCell className={s.headCell}>Дата</TableCell>
            <TableCell className={s.headCell}>Имя</TableCell>
            <TableCell className={s.headCell}>Телефон</TableCell>
            <TableCell className={s.headCell}>Email</TableCell>
            <TableCell className={s.headCell}>Компания</TableCell>
            <TableCell className={s.headCell}>Комментарий</TableCell>
            <TableCell align='right' className={s.headCell}>
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, phone, name, company, email, comment, time }) => (
            <TableRow key={id} hover className={s.row}>
              <TableCell className={s.nowrap}>
                <Typography variant='body2' color='text.secondary'>
                  {time ? getDate(time) : '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' className={s.name}>
                  {name || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' className={s.mono}>
                  {phone || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={email ? s.value : s.muted}
                >
                  {email || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={company ? s.value : s.muted}
                >
                  {company || '—'}
                </Typography>
              </TableCell>
              <TableCell className={s.commentCell}>
                <Typography
                  variant='body2'
                  className={[s.comment, comment ? s.value : s.muted]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {comment || '—'}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Tooltip title='Удалить'>
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() => onDelete(id)}
                  >
                    <DeleteOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
