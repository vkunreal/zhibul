import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import { DeleteUserDTO } from './interfaces'
import { usersSchema } from './schemas'

export const getUsers = () =>
  request({
    method: 'GET',
    path: '/api/users',
    schema: usersSchema,
    auth: true,
  })

export const deleteUser = (body: DeleteUserDTO) =>
  request({
    method: 'DELETE',
    path: '/api/user',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
