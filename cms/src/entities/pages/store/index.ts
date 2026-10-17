import { createEffect, createStore, sample } from 'effector'

import { addPage, changePage, deletePage, getPages } from '@shared/api'

import { Page } from '../model'
import { toPage, toSavePageDTO } from '../utils/mappers'

export const getPagesFx = createEffect(getPages)
export const addPageFx = createEffect((page: Page) =>
  addPage(toSavePageDTO(page)),
)
export const changePageFx = createEffect((page: Page) =>
  changePage(toSavePageDTO(page)),
)
export const deletePageFx = createEffect((url: string) => deletePage({ url }))

export const $pages = createStore<Page[]>([]).on(
  getPagesFx.doneData,
  (_, pages) => pages.map(toPage),
)

const reloadPages = getPagesFx.prepend(() => undefined)

sample({
  clock: [addPageFx.done, changePageFx.done, deletePageFx.done],
  target: reloadPages,
})
