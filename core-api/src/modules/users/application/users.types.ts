import { User, UserWithRoles } from 'shared/models/User'

export interface FindUserWhere {
  id?: string
  phoneNumber?: string
  email?: string
}

export interface FindUserOptions {
  where: FindUserWhere
  withRoles?: boolean
}

export interface CreateUserOptions {
  withRoles?: boolean
  // Only the sign-up flow may set this, because there the OTP has just proven
  // the caller owns the number.
  phoneConfirmedAt?: Date
}

export interface UserWithRolesRaw extends User {
  roles: {
    role: {
      name: string
    }
  }[]
}

export type UserResult = User | UserWithRoles | null
