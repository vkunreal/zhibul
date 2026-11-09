import { Prisma } from 'prisma/client'
import { UpdateUserDTO } from '../../api/v1/dto/update-user-dto'

interface CurrentAccount {
  phoneNumber: string
  email: string | null
}

// Админская запись не подтверждена кодом. Новый телефон теряет отметку
// подтверждения до следующего входа. Новая почта пишется уже подтверждённой,
// null очищает адрес.
export const userUpdateData = (
  dto: Pick<UpdateUserDTO, 'firstName' | 'lastName' | 'phoneNumber' | 'email'>,
  current: CurrentAccount,
) => {
  const data: Prisma.UserUpdateInput = {}

  if (dto.firstName !== undefined) data.firstName = dto.firstName
  if (dto.lastName !== undefined) data.lastName = dto.lastName

  const phoneChanged =
    dto.phoneNumber !== undefined && dto.phoneNumber !== current.phoneNumber

  if (phoneChanged) {
    data.phoneNumber = dto.phoneNumber
    data.phoneConfirmedAt = null
  }

  if (dto.email !== undefined && dto.email !== current.email) {
    data.email = dto.email
    data.pendingEmail = null
    data.emailConfirmedAt = dto.email === null ? null : new Date()
  }

  return { data, phoneChanged }
}
