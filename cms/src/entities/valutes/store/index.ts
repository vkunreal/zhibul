import { createEffect, createEvent, createStore, sample } from 'effector'

import { changeValute, getValutes } from '@shared/api'

import { Valute } from '../model'
import { toValute } from '../utils/mappers'

import { ValuteChanges } from './interfaces'

export const valutesRequested = createEvent()
export const changeValuteSubmitted = createEvent<ValuteChanges>()

export const getValutesFx = createEffect(getValutes)
export const changeValuteFx = createEffect(changeValute)

export const $valutes = createStore<Valute[]>([]).on(
  getValutesFx.doneData,
  (_, valutes) => valutes.map(toValute),
)

sample({
  clock: valutesRequested,
  target: getValutesFx,
})

sample({
  clock: changeValuteSubmitted,
  filter: ({ value }) => !!value.trim() && !Number.isNaN(Number(value)),
  fn: ({ id, value }) => ({ id, value: Number(value) }),
  target: changeValuteFx,
})

sample({
  clock: changeValuteFx.done,
  target: getValutesFx,
})
