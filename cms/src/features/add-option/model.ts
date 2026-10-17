import { createEvent, sample } from 'effector'

import { addOptionFx } from '@entities/options'
import { NewOptionValues } from '@entities/options/store/interfaces'

export const addOptionSubmitted = createEvent<NewOptionValues>()

sample({
  clock: addOptionSubmitted,
  filter: ({ name, value }) => !!name.trim() && !!value.trim(),
  fn: ({ name, value, itemId, position }) => ({
    option: { name, value, item_id: itemId, position },
    itemId,
  }),
  target: addOptionFx,
})
