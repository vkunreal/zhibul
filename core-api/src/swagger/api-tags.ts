export const ApiTag = {
  unauthAuth: 'unauth · auth',
  unauthRecovery: 'unauth · recovery',
  unauthVariables: 'unauth · variables',
  publicAuth: 'public · auth',
  publicProfile: 'public · profile',
  adminUsers: 'admin · users',
  adminVariables: 'admin · variables',
  adminCurrencies: 'admin · currencies',
} as const

// Порядок здесь — порядок разделов в Swagger.
export const apiTags = [
  {
    name: ApiTag.unauthAuth,
    description: 'Code, login, and refresh. No session.',
  },
  {
    name: ApiTag.unauthRecovery,
    description: 'Replace a lost phone number through a confirmed email.',
  },
  {
    name: ApiTag.unauthVariables,
    description: 'Phone, address, hours, and other site settings. No session.',
  },
  {
    name: ApiTag.publicAuth,
    description: 'The current session. Cookie accessToken.',
  },
  {
    name: ApiTag.publicProfile,
    description: 'Name, email, and phone of the signed-in user.',
  },
  {
    name: ApiTag.adminUsers,
    description: 'Accounts. Role ADMIN.',
  },
  {
    name: ApiTag.adminVariables,
    description: 'Create, change, and delete site settings. Role ADMIN.',
  },
  {
    name: ApiTag.adminCurrencies,
    description: 'Create, change, and delete currency rates. Role ADMIN.',
  },
] as const
