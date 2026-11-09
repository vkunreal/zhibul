import { createEffect, createEvent, createStore, sample } from 'effector'

import {
  addOption,
  changeOption,
  changeOptionPositions,
  deleteOption,
  deleteOptions,
  getOptions,
  type AddOptionDTO,
  type ChangeOptionDTO,
} from '@shared/api'

import { ItemOption } from '../model'
import { toItemOption } from '../utils/mappers'

import {
  OptionChanges,
  OptionPositionsChange,
  OptionRef,
  OptionRequest,
} from './interfaces'

export const changeOptionSubmitted = createEvent<OptionChanges>()

export const getOptionsFx = createEffect(getOptions)

export const addOptionFx = createEffect(
  async ({ option, itemId }: OptionRequest<AddOptionDTO>) => {
    await addOption(option)
    return itemId
  },
)

export const changeOptionFx = createEffect(
  async ({ option, itemId }: OptionRequest<ChangeOptionDTO>) => {
    await changeOption(option)
    return itemId
  },
)

export const changeOptionPositionsFx = createEffect(
  async ({ positions, itemId }: OptionPositionsChange) => {
    await changeOptionPositions(
      positions.map(({ id, position }) => ({ id, position })),
    )
    return itemId
  },
)

export const deleteOptionsFx = createEffect(async (itemId: number) => {
  await deleteOptions(itemId)
  return itemId
})

export const deleteOptionFx = createEffect(
  async ({ id, itemId }: OptionRef) => {
    await deleteOption({ option_id: id })
    return itemId
  },
)

export const $options = createStore<ItemOption[]>([]).on(
  getOptionsFx.doneData,
  (_, options) => options.map(toItemOption),
)

sample({
  clock: changeOptionSubmitted,
  fn: ({ itemId, optionId, name, value, isDropdown, showMenu }) => ({
    option: {
      option_id: optionId,
      name,
      value,
      is_dropdown: isDropdown,
      show_menu: showMenu,
    },
    itemId,
  }),
  target: changeOptionFx,
})

sample({
  clock: [
    addOptionFx.doneData,
    changeOptionFx.doneData,
    changeOptionPositionsFx.doneData,
    deleteOptionFx.doneData,
    deleteOptionsFx.doneData,
  ],
  target: getOptionsFx,
})
