import { Button, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import {
  $users,
  $usersLoading,
  deleteUserFx,
  usersRequested,
} from '@entities/users'
import { Confirm, PageHeader } from '@shared/ui'

import { UsersTable } from './ui/UsersTable'

import s from './styles.module.scss'

export const Users: React.FC = () => {
  const [users, loading, loadUsers, removeUser] = useUnit([
    $users,
    $usersLoading,
    usersRequested,
    deleteUserFx,
  ])
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null)

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleDelete = () => {
    if (deletedUserId !== null) removeUser(deletedUserId)
    setDeletedUserId(null)
  }

  const deletedUser = users.find((user) => user.id === deletedUserId)

  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader
        title='Пользователи'
        subtitle='Заявки и контакты посетителей сайта'
      />

      <UsersTable users={users} loading={loading} onDelete={setDeletedUserId} />

      <Confirm
        isOpen={deletedUserId !== null}
        onClose={() => setDeletedUserId(null)}
        title={`Удалить пользователя «${deletedUser?.name || deletedUser?.phone || ''}»?`}
      >
        <Button variant='outlined' color='success' onClick={handleDelete}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
