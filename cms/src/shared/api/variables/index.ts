import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import {
  AddVariableDTO,
  ChangeVariableDTO,
  DeleteVariableDTO,
} from './interfaces'
import { variablesSchema } from './schemas'

export const getVariables = () =>
  request({
    method: 'GET',
    path: '/api/variables',
    schema: variablesSchema,
    auth: true,
  })

export const addVariable = (body: AddVariableDTO) =>
  request({
    method: 'POST',
    path: '/api/variable',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const changeVariable = (body: ChangeVariableDTO) =>
  request({
    method: 'PUT',
    path: '/api/variable',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const deleteVariable = (body: DeleteVariableDTO) =>
  request({
    method: 'DELETE',
    path: '/api/variable',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
