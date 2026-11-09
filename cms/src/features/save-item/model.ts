import { createEvent, sample } from 'effector'

import { $countries } from '@entities/countries'
import { addItemFx, changeItemFx } from '@entities/items'

import { ChangeItemPayload, ItemFormValues } from './interfaces'
import { toAddItemDTO, toChangeItemDTO } from './mappers'

export const createItemSubmitted = createEvent<ItemFormValues>()
export const changeItemSubmitted = createEvent<ChangeItemPayload>()

sample({
  clock: createItemSubmitted,
  source: $countries,
  fn: (countries, values) => toAddItemDTO(values, countries),
  target: addItemFx,
})

sample({
  clock: changeItemSubmitted,
  source: $countries,
  fn: toChangeItemDTO,
  target: changeItemFx,
})
