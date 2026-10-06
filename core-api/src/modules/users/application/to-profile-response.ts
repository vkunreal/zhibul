import { ProfileResponseDTO } from '../api/v1/dto/profile-response-dto'
import { UserWithRolesRaw } from './users.types'

// Fields are picked one by one so that a new column never leaks into the
// profile response by accident.
export const toProfileResponse = (
  user: UserWithRolesRaw,
): ProfileResponseDTO => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phoneNumber,
  phoneConfirmedAt: user.phoneConfirmedAt,
  email: user.email,
  pendingEmail: user.pendingEmail,
  emailConfirmedAt: user.emailConfirmedAt,
  isActive: user.isActive,
  roles: user.roles.map(({ role }) => role.name),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})
