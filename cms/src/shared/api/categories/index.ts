import { request } from '../http'

import {
  AddCategoryDTO,
  ChangeCategoryDTO,
  SetCategoryActiveDTO,
} from './interfaces'
import {
  addCategoryResponseSchema,
  categoriesWithItemsCountSchema,
  setCategoryActiveResponseSchema,
  uploadCategoryImageResponseSchema,
} from './schemas'

export const getCategories = () =>
  request({
    method: 'GET',
    path: '/api/categories/with-items-count/',
    schema: categoriesWithItemsCountSchema,
  })

export const addCategory = (body: AddCategoryDTO) =>
  request({
    method: 'POST',
    path: '/api/category',
    schema: addCategoryResponseSchema,
    auth: true,
    body,
  })

export const uploadCategoryImage = (id: number, body: FormData) =>
  request({
    method: 'POST',
    path: `/api/category/image/${id}`,
    schema: uploadCategoryImageResponseSchema,
    auth: true,
    body,
  })

export const setCategoryActive = (body: SetCategoryActiveDTO) =>
  request({
    method: 'PUT',
    path: '/api/category/active',
    schema: setCategoryActiveResponseSchema,
    auth: true,
    body,
  })

export const changeCategory = (body: ChangeCategoryDTO) =>
  request({ method: 'PUT', path: '/api/category', auth: true, body })

export const deleteCategory = (id: number) =>
  request({ method: 'DELETE', path: `/api/category/${id}`, auth: true })
