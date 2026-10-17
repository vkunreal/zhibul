import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import { DeletePageDTO, SavePageDTO } from './interfaces'
import { pagesSchema } from './schemas'

export const getPages = () =>
  request({ method: 'GET', path: '/api/pages', schema: pagesSchema })

export const addPage = (body: SavePageDTO) =>
  request({
    method: 'POST',
    path: '/api/page',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const changePage = (body: SavePageDTO) =>
  request({
    method: 'PUT',
    path: '/api/page',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const deletePage = (body: DeletePageDTO) =>
  request({
    method: 'DELETE',
    path: '/api/page',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
