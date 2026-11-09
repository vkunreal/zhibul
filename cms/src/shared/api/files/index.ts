import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import { DeleteItemFileDTO } from './interfaces'
import { itemFilesSchema, uploadItemFileResponseSchema } from './schemas'

export const getItemFiles = (itemId: number) =>
  request({
    method: 'GET',
    path: `/api/files/${itemId}/`,
    schema: itemFilesSchema,
  })

export const uploadItemFile = (body: FormData) =>
  request({
    method: 'POST',
    path: '/api/file/',
    schema: uploadItemFileResponseSchema,
    auth: true,
    body,
  })

export const deleteItemFiles = (itemId: number) =>
  request({
    method: 'DELETE',
    path: `/api/files/${itemId}`,
    schema: statusResponseSchema,
    auth: true,
  })

export const deleteItemFile = (body: DeleteItemFileDTO) =>
  request({
    method: 'DELETE',
    path: '/api/file/',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
