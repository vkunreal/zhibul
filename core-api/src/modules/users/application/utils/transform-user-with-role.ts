import { UserWithRoles } from 'shared/models/User'
import { UserWithRolesRaw } from '../users.types'

export const transformUserWithRoles = (
  user: UserWithRolesRaw,
): UserWithRoles => {
  const { roles, ...userData } = user

  return {
    ...userData,
    roles: Array.isArray(roles) ? roles.map((item) => item.role.name) : [],
  }
}
