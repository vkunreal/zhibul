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
  // Это может выставить только регистрация: там код только что доказал,
  // что номер принадлежит вызывающему.
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
