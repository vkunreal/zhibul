import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import {
  AddOptionDTO,
  ChangeOptionDTO,
  DeleteOptionDTO,
  OptionPositionDTO,
} from './interfaces'
import { optionsSchema } from './schemas'

export const getOptions = (itemId: number) =>
  request({
    method: 'GET',
    path: `/api/options/${itemId}`,
    schema: optionsSchema,
  })

export const addOption = (body: AddOptionDTO) =>
  request({
    method: 'POST',
    path: '/api/option',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const changeOption = (body: ChangeOptionDTO) =>
  request({
    method: 'PUT',
    path: '/api/option',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

// На пустой массив сервер отвечает пустым телом, поэтому схему не передаём.
export const changeOptionPositions = (body: OptionPositionDTO[]) =>
  request({ method: 'PUT', path: '/api/option/positions', auth: true, body })

export const deleteOption = (body: DeleteOptionDTO) =>
  request({
    method: 'DELETE',
    path: '/api/option',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
