import { request } from '../http'

import { LoginDTO } from './interfaces'
import { loginResponseSchema } from './schemas'

export const login = async (body: LoginDTO) => {
  const { token } = await request({
    method: 'POST',
    path: '/api/login',
    schema: loginResponseSchema,
    body,
  })

  return token
}
