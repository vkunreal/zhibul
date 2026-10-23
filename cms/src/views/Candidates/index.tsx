import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import {
  $candidates,
  $candidatesLoading,
  candidatesRequested,
  deleteCandidateFx,
} from '@entities/users'
import { Confirm } from '@shared/ui'

import s from './styles.module.scss'

export const Candidates: React.FC = () => {
  const [candidates, loading, loadCandidates, removeCandidate] = useUnit([
    $candidates,
    $candidatesLoading,
    candidatesRequested,
    deleteCandidateFx,
  ])
  const [deletedCandidateId, setDeletedCandidateId] = useState<number | null>(
    null,
  )

  const handleClose = () => setDeletedCandidateId(null)

  useEffect(() => {
    loadCandidates()
  }, [loadCandidates])

  const handleDelete = () => {
    if (deletedCandidateId !== null) removeCandidate(deletedCandidateId)
    setDeletedCandidateId(null)
  }

  return (
    <div className={s.page}>
      <h1>Потенциальные покупатели</h1>

      <p className={s.lead}>
        Потенциальные покупатели - раздел, в котором хранятся посетители,
        вводившие данные в обратной связи, но по какой-то причине покинувшие
        сайт
      </p>

      {!!candidates.length && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Телефон</TableCell>
                <TableCell align='center'>Имя</TableCell>
                <TableCell align='center'>Компания</TableCell>
                <TableCell align='center'>Email</TableCell>
                <TableCell align='center'>Комментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map(
                ({ id, phone, name, company, email, comment }) => (
                  <TableRow key={id} className={s.row}>
                    <TableCell align='center'>{phone || '-'}</TableCell>
                    <TableCell align='center'>{name || '-'}</TableCell>
                    <TableCell align='center'>{company || '-'}</TableCell>
                    <TableCell align='center'>{email || '-'}</TableCell>
                    <TableCell align='center'>{comment || '-'}</TableCell>
                    <TableCell align='center'>
                      <Button
                        color='error'
                        variant='outlined'
                        onClick={() => setDeletedCandidateId(id)}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!candidates.length && !loading && <p>Потенциальных покупателей нет</p>}

      {loading && (
        <div className={s.loader}>
          <CircularProgress />
        </div>
      )}

      <Confirm
        isOpen={deletedCandidateId !== null}
        onClose={handleClose}
        title='Вы уверены, что хотите удалить пользователя?'
      >
        <Button variant='outlined' color='error' onClick={handleDelete}>
          Удалить
        </Button>
      </Confirm>
    </div>
  )
}
