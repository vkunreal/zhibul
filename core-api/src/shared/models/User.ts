export interface User {
  id: string
  phoneNumber: string
  name: string | null
  passwordHash: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface UserWithRoles extends User {
  roles: string[]
}
