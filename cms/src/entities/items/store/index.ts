import { createEffect, createEvent, createStore, sample } from 'effector'

import {
  addItem,
  changeItem,
  deleteItem,
  getItemById,
  getItems,
} from '@shared/api'

import { Item } from '../model'
import { DEFAULT_ITEMS_PAGE_LIMIT } from '../utils/constants'
import { toItem } from '../utils/mappers'

import { ItemsQuery, ItemsRequest } from './interfaces'

export const pageLimitChanged = createEvent<number>()
export const itemsRequested = createEvent<ItemsQuery | void>()
export const configureItemRequested = createEvent<number>()

export const getItemsFx = createEffect(
  ({ page, categoryUrl, search, pageLimit }: ItemsRequest) =>
    getItems({
      page,
      limit: pageLimit,
      category_url: categoryUrl || undefined,
      search: search || undefined,
    }),
)

export const getItemByIdFx = createEffect(async (id: number) =>
  toItem(await getItemById(id)),
)

export const $itemsLoading = getItemsFx.pending
export const $configureItemLoading = getItemByIdFx.pending
export const addItemFx = createEffect(addItem)
export const changeItemFx = createEffect(changeItem)
export const deleteItemFx = createEffect(deleteItem)

export const $items = createStore<Item[]>([]).on(
  getItemsFx.doneData,
  (_, { data }) => data.map(toItem),
)

export const $configureItem = createStore<Item | null>(null)
  .on(getItemByIdFx.doneData, (_, item) => item)
  .on(getItemByIdFx.fail, () => null)
  .reset(configureItemRequested)

sample({
  clock: configureItemRequested,
  target: getItemByIdFx,
})

export const $itemPages = createStore(0).on(
  getItemsFx.done,
  (_, { params, result }) => Math.ceil(result.count / params.pageLimit) || 1,
)

export const $pageLimit = createStore(DEFAULT_ITEMS_PAGE_LIMIT).on(
  pageLimitChanged,
  (_, pageLimit) => pageLimit,
)

const $itemsQuery = createStore<ItemsQuery>({
  page: 1,
  categoryUrl: '',
  search: '',
})

sample({
  clock: itemsRequested,
  source: $itemsQuery,
  fn: (itemsQuery, query) => query || itemsQuery,
  target: $itemsQuery,
})

sample({
  clock: itemsRequested,
  source: { pageLimit: $pageLimit, itemsQuery: $itemsQuery },
  fn: ({ pageLimit, itemsQuery }, query) => ({
    ...(query || itemsQuery),
    pageLimit,
  }),
  target: getItemsFx,
})

// Без аргумента перезагружает последнюю запрошенную страницу — так после
// добавления, изменения или удаления товара таблица остаётся на месте.
const reloadItems = itemsRequested.prepend(() => undefined)

sample({
  clock: [addItemFx.done, changeItemFx.done, deleteItemFx.done],
  target: reloadItems,
})
