import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import { DeleteNewsDTO, DeleteNewsMediaDTO, SaveNewsDTO } from './interfaces'
import { newsListSchema, newsMediaListSchema, newsSchema } from './schemas'

export const getNews = () =>
  request({ method: 'GET', path: '/api/news', schema: newsListSchema })

export const getNewsById = (id: number) =>
  request({ method: 'GET', path: `/api/news/id/${id}`, schema: newsSchema })

export const addNews = (body: SaveNewsDTO) =>
  request({
    method: 'POST',
    path: '/api/news',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const changeNews = (body: SaveNewsDTO) =>
  request({
    method: 'PUT',
    path: '/api/news/',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const deleteNews = (body: DeleteNewsDTO) =>
  request({
    method: 'DELETE',
    path: '/api/news',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const getNewsMedia = (newsId: number) =>
  request({
    method: 'GET',
    path: `/api/news/media/${newsId}`,
    schema: newsMediaListSchema,
  })

export const uploadNewsMedia = (newsId: number, body: FormData) =>
  request({
    method: 'POST',
    path: `/api/news/media/${newsId}`,
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const deleteNewsMedia = (body: DeleteNewsMediaDTO) =>
  request({
    method: 'DELETE',
    path: '/api/news/media/',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
