import { createEffect, createEvent, createStore, sample } from 'effector'

import { getCountries } from '@shared/api'

import { Country } from '../model'

export const countriesRequested = createEvent()

export const getCountriesFx = createEffect(getCountries)

export const $countries = createStore<Country[]>([]).on(
  getCountriesFx.doneData,
  (_, countries) => countries,
)

sample({
  clock: countriesRequested,
  source: $countries,
  filter: (countries) => countries.length === 0,
  target: getCountriesFx,
})
