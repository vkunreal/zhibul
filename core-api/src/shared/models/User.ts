export interface User {
  id: string
  firstName: string | null
  lastName: string | null
  phoneNumber: string
  phoneConfirmedAt: Date | null
  email: string | null
  pendingEmail: string | null
  emailConfirmedAt: Date | null
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface UserWithRoles extends User {
  roles: string[]
}
