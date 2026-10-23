import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import {
  AddItemDTO,
  ChangeItemDTO,
  GetItemsQueryDTO,
  ItemImageSrcDTO,
} from './interfaces'
import {
  copiedItemSchema,
  itemImagesSchema,
  itemSchema,
  itemsPageSchema,
} from './schemas'

export const getItemById = (id: number) =>
  request({
    method: 'GET',
    path: `/api/item/id/${id}`,
    schema: itemSchema,
  })

export const getItems = ({
  category_url,
  search,
  ...query
}: GetItemsQueryDTO) =>
  request({
    method: 'GET',
    path: '/api/items-splitted',
    schema: itemsPageSchema,
    params: {
      ...query,
      ...(category_url ? { category_url } : {}),
      ...(search ? { search } : {}),
    },
  })

export const addItem = (body: AddItemDTO) =>
  request({
    method: 'POST',
    path: '/api/item',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const changeItem = (body: ChangeItemDTO) =>
  request({
    method: 'PUT',
    path: '/api/item/',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const copyItem = (id: number) =>
  request({
    method: 'POST',
    path: `/api/item/${id}/copy`,
    schema: copiedItemSchema,
    auth: true,
  })

export const deleteItem = (id: number) =>
  request({
    method: 'DELETE',
    path: `/api/item/${id}`,
    schema: statusResponseSchema,
    auth: true,
  })

export const getItemImages = (itemId: number) =>
  request({
    method: 'GET',
    path: `/api/item/images/${itemId}`,
    schema: itemImagesSchema,
  })

export const uploadItemImages = (itemId: number, body: FormData) =>
  request({
    method: 'POST',
    path: `/api/item/images/${itemId}`,
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const setMainItemImage = (body: ItemImageSrcDTO) =>
  request({
    method: 'PUT',
    path: '/api/item/image-main/',
    schema: statusResponseSchema,
    auth: true,
    body,
  })

export const deleteItemImage = (body: ItemImageSrcDTO) =>
  request({
    method: 'DELETE',
    path: '/api/item/delete/image',
    schema: statusResponseSchema,
    auth: true,
    body,
  })
