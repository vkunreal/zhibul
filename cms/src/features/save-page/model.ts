import { createEvent, sample } from 'effector'

import { addPageFx, changePageFx } from '@entities/pages'
import { Page } from '@entities/pages/model'

export const createPageSubmitted = createEvent<Page>()
export const changePageSubmitted = createEvent<Page>()

sample({
  clock: createPageSubmitted,
  target: addPageFx,
})

sample({
  clock: changePageSubmitted,
  target: changePageFx,
})
