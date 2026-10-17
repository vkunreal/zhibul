import { createEvent, sample } from 'effector'

import { addNewsFx } from '@entities/news'
import { NewsFormValues } from '@entities/news/store/interfaces'
import { toSaveNewsDTO } from '@entities/news/utils/mappers'

export const createNewsSubmitted = createEvent<NewsFormValues>()

sample({
  clock: createNewsSubmitted,
  fn: toSaveNewsDTO,
  target: addNewsFx,
})
