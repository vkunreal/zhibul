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
import { Confirm } from '../../components/Confirm'

interface ICandidate {
  id: string
  phone: string
  name?: string
  company?: string
  email?: string
  comment?: string
}

export const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([])
  const [open, setOpen] = useState(false)
  const [deletedCandidateId, setDeletedCandidateId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClose = () => setOpen(false)

  useEffect(() => {
    updateCandidates(true)
  }, [])

  const updateCandidates = (withLoading: boolean = false) => {
    if (withLoading) setLoading(true)

    axios.get('/api/candidates').then((res) => {
      setCandidates(res.data)
      setLoading(false)
    })
  }

  const deleteCandidate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const className = (e.target as HTMLButtonElement)?.getAttribute('id') || ''

    setDeletedCandidateId((className.match(/\d+/) || [])[0] || '')
    setOpen(true)
  }

  const handleDelete = () => {
    axios
      .delete('/api/candidate', { data: { id: deletedCandidateId } })
      .then((res) => {
        if (res.data.status) {
          console.log('Candidate was deleted')
        } else {
          console.log('Someth went wrong')
        }
      })
      .finally(() => {
        updateCandidates()
        setOpen(false)
      })
  }

  return (
    <div className="pd-4">
      <h1>Потенциальные покупатели</h1>

      {!!candidates.length && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Телефон</TableCell>
                <TableCell align="center">Имя</TableCell>
                <TableCell align="center">Компания</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Комментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map(
                ({ id, phone, name, company, email, comment }) => (
                  <TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{phone || '-'}</TableCell>
                    <TableCell align="center">{name || '-'}</TableCell>
                    <TableCell align="center">{company || '-'}</TableCell>
                    <TableCell align="center">{email || '-'}</TableCell>
                    <TableCell align="center">{comment || '-'}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        variant="outlined"
                        id={`user-${id}`}
                        onClick={deleteCandidate}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!candidates.length && !loading && <p>Потенциальных покупателей нет</p>}

      {loading && (
        <div className="d-flex justify-center mt-35">
          <CircularProgress />
        </div>
      )}

      <Confirm
        isOpen={open}
        onClose={handleClose}
        title="Вы уверены, что хотите удалить пользователя?"
      >
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Удалить
        </Button>
      </Confirm>
    </div>
  )
}
