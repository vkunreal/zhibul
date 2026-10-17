import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import { ChangeValuteDTO } from './interfaces'
import { valutesSchema } from './schemas'

export const getValutes = () =>
  request({ method: 'GET', path: '/api/valutes', schema: valutesSchema })

export const changeValute = (body: ChangeValuteDTO) =>
  request({
    method: 'PUT',
    path: '/api/valutes',
    schema: statusResponseSchema,
    body,
  })
