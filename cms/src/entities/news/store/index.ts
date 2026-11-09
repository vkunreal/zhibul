import { createEffect, createEvent, createStore, sample } from 'effector'

import {
  addNews,
  changeNews,
  deleteNews,
  deleteNewsMedia,
  getNews,
  getNewsById,
  getNewsMedia,
  uploadNewsMedia,
} from '@shared/api'

import { News, NewsMedia } from '../model'
import { toNews, toNewsMedia, toSaveNewsDTO } from '../utils/mappers'

import { NewsFormValues, NewsMediaRef, NewsMediaUpload } from './interfaces'

export const newsRequested = createEvent()
export const changeNewsSubmitted = createEvent<NewsFormValues>()

export const getNewsFx = createEffect(getNews)
export const getNewsItemFx = createEffect(getNewsById)
export const addNewsFx = createEffect(addNews)
export const changeNewsFx = createEffect(changeNews)
export const deleteNewsFx = createEffect((id: number) => deleteNews({ id }))

export const getNewsMediaFx = createEffect(getNewsMedia)
export const uploadNewsMediaFx = createEffect(
  ({ newsId, formData }: NewsMediaUpload) => uploadNewsMedia(newsId, formData),
)
export const deleteNewsMediaFx = createEffect(({ src }: NewsMediaRef) =>
  deleteNewsMedia({ src }),
)

export const $news = createStore<News[]>([]).on(getNewsFx.doneData, (_, news) =>
  news.map(toNews),
)

export const $newsItem = createStore<News | null>(null).on(
  getNewsItemFx.doneData,
  (_, newsItem) => toNews(newsItem),
)

// Картинки обновляются отдельно от новости, чтобы перезагрузка
// не сбрасывала форму редактирования.
export const $newsMedia = createStore<NewsMedia[]>([])
  .on(getNewsItemFx.doneData, (_, newsItem) => newsItem.media.map(toNewsMedia))
  .on(getNewsMediaFx.doneData, (_, media) => media.map(toNewsMedia))

sample({
  clock: newsRequested,
  target: getNewsFx,
})

sample({
  clock: changeNewsSubmitted,
  fn: toSaveNewsDTO,
  target: changeNewsFx,
})

sample({
  clock: [addNewsFx.done, deleteNewsFx.done],
  target: getNewsFx,
})

sample({
  clock: changeNewsFx.done,
  source: $newsItem,
  filter: (newsItem: News | null): newsItem is News => newsItem !== null,
  fn: ({ id }) => id,
  target: getNewsItemFx,
})

sample({
  clock: [uploadNewsMediaFx.done, deleteNewsMediaFx.done],
  fn: ({ params }) => params.newsId,
  target: getNewsMediaFx,
})
