import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'

import { AppGate } from '@/core/model'

import { authApi } from '../api'

export const authEvent = createEvent<{ phoneNumber: string; code: string }>()

export const $isAuthenticated = createStore<boolean>(false)

const requestMeFx = createEffect(async () => {
  const response = await authApi.me()
  console.log(response)
  return response
})

const $isAuthChecked = createStore(false).on(requestMeFx.finally, () => true)

export const $isAuthLoading = combine(
  requestMeFx.pending,
  $isAuthChecked,
  (pending, checked) => pending || !checked,
)

const authFx = createEffect(
  async (body: { phoneNumber: string; code: string }) => {
    const response = await authApi.auth(body)
    return response
  },
)

sample({
  clock: AppGate.open,
  target: requestMeFx,
})

sample({
  clock: requestMeFx.doneData,
  fn: (data) => data.status === 200 && data.data.id !== null,
  target: $isAuthenticated,
})

sample({
  clock: requestMeFx.failData,
  fn: () => false,
  target: $isAuthenticated,
})

sample({
  clock: authEvent,
  target: authFx,
})

sample({
  clock: authFx.doneData,
  target: requestMeFx,
})
