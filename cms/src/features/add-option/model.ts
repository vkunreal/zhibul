import { createEvent, sample } from 'effector'

import { $options, addOptionFx } from '@entities/options'
import { NewOptionValues } from '@entities/options/store/interfaces'
import { nextOptionPosition } from '@entities/options/utils/mappers'

export const addOptionSubmitted = createEvent<NewOptionValues>()

// Позиция считается при отправке, а не при открытии модалки:
// модалка не закрывается, и в ней можно добавить несколько опций подряд.
sample({
  clock: addOptionSubmitted,
  source: $options,
  filter: (_, { name, value }) => !!name.trim() && !!value.trim(),
  fn: (options, { name, value, itemId }) => ({
    option: {
      name,
      value,
      item_id: itemId,
      position: nextOptionPosition(options),
    },
    itemId,
  }),
  target: addOptionFx,
})
