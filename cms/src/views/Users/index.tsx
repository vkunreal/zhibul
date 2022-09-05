import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { DeleteConfirm } from '../../components/DeleteConfirm'

interface IUser {
  id: string
  phone: string
  name: string
  company?: string
  email?: string
  comment?: string
}

// interface ICandidate {
//   id: string
//   phone: string
//   name?: string
//   company?: string
//   email?: string
//   comment?: string
// }

export const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [open, setOpen] = useState(false)
  const [deletedUserId, setDeletedUserId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClose = () => setOpen(false)

  useEffect(() => {
    updateUsers(true)
  }, [])

  const updateUsers = (withLoading: boolean = false) => {
    if (withLoading) setLoading(true)

    axios.get('/api/users').then((res) => {
      setUsers(res.data)
      setLoading(false)
    })
  }

  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const className = (e.target as HTMLButtonElement)?.getAttribute('id') || ''

    setDeletedUserId((className.match(/\d+/) || [])[0] || '')
    setOpen(true)
  }

  const handleDelete = () => {
    axios
      .delete('/api/user', { data: { id: deletedUserId } })
      .then((res) => {
        if (res.data.status) {
          console.log('User was deleted')
        } else {
          console.log('Someth went wrong')
        }
      })
      .finally(() => {
        updateUsers()
        setOpen(false)
      })
  }

  return (
    <div>
      <h1>Users</h1>

      {!!users.length && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(({ id, phone, name, company, email, comment }) => (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{phone}</TableCell>
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">{company}</TableCell>
                  <TableCell align="center">{email}</TableCell>
                  <TableCell align="center">{comment}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      variant="outlined"
                      id={`user-${id}`}
                      onClick={deleteUser}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!users.length && <p>Пользователей нет</p>}

      {loading && (
        <div className="d-flex justify-center mt-35">
          <CircularProgress />
        </div>
      )}

      <DeleteConfirm
        isOpen={open}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </div>
  )
}
