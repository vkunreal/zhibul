import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  Box,
  Button,
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
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import {
  $users,
  $usersLoading,
  deleteUserFx,
  usersRequested,
} from '@entities/users'
import { Confirm } from '@shared/ui'
import { getDate } from '@shared/utils'

const headCellSx = {
  bgcolor: 'grey.50',
  fontWeight: 600,
  color: 'text.secondary',
  borderBottomColor: 'divider',
  whiteSpace: 'nowrap',
} as const

export const Users: React.FC = () => {
  const [users, loading, loadUsers, removeUser] = useUnit([
    $users,
    $usersLoading,
    usersRequested,
    deleteUserFx,
  ])
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null)

  const handleClose = () => setDeletedUserId(null)

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleDelete = () => {
    if (deletedUserId !== null) removeUser(deletedUserId)
    setDeletedUserId(null)
  }

  const deletedUser = users.find((user) => user.id === deletedUserId)

  return (
    <Stack spacing={2.5} sx={{ p: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
          Пользователи
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          Заявки и контакты посетителей сайта
        </Typography>
      </Box>

      {!loading && users.length === 0 ? (
        <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
          <Typography color='text.secondary'>Пользователей пока нет</Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          variant='outlined'
          sx={{
            position: 'relative',
            minHeight: loading && !users.length ? 220 : undefined,
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
                <TableCell sx={headCellSx}>Дата</TableCell>
                <TableCell sx={headCellSx}>Имя</TableCell>
                <TableCell sx={headCellSx}>Телефон</TableCell>
                <TableCell sx={headCellSx}>Email</TableCell>
                <TableCell sx={headCellSx}>Компания</TableCell>
                <TableCell sx={headCellSx}>Комментарий</TableCell>
                <TableCell align='right' sx={headCellSx}>
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(
                ({ id, phone, name, company, email, comment, time }) => (
                  <TableRow
                    key={id}
                    hover
                    sx={{ '&:last-child td': { borderBottom: 0 } }}
                  >
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Typography variant='body2' color='text.secondary'>
                        {time ? getDate(time) : '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        {name || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        sx={{ fontFamily: 'ui-monospace, monospace' }}
                      >
                        {phone || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        sx={{
                          color: email ? 'text.primary' : 'text.disabled',
                        }}
                      >
                        {email || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        sx={{
                          color: company ? 'text.primary' : 'text.disabled',
                        }}
                      >
                        {company || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 280 }}>
                      <Typography
                        variant='body2'
                        sx={{
                          color: comment ? 'text.primary' : 'text.disabled',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {comment || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Удалить'>
                        <IconButton
                          size='small'
                          color='error'
                          onClick={() => setDeletedUserId(id)}
                        >
                          <DeleteOutlinedIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Confirm
        isOpen={deletedUserId !== null}
        onClose={handleClose}
        title={`Удалить пользователя «${deletedUser?.name || deletedUser?.phone || ''}»?`}
      >
        <Button variant='outlined' color='success' onClick={handleDelete}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
