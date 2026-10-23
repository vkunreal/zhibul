import { User } from '@entities/users/model'

export interface UsersTableProps {
  users: User[]
  loading: boolean
  onDelete: (id: number) => void
}
