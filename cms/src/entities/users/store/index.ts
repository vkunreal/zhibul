import { createEffect, createEvent, createStore, sample } from 'effector'

import { deleteUser, getUsers } from '@shared/api'

import { User } from '../model'
import { toUser } from '../utils/mappers'

export const usersRequested = createEvent()

export const getUsersFx = createEffect(getUsers)
export const deleteUserFx = createEffect((id: number) => deleteUser({ id }))

export const $users = createStore<User[]>([]).on(
  getUsersFx.doneData,
  (_, users) => users.map(toUser),
)

export const $usersLoading = getUsersFx.pending

sample({
  clock: [usersRequested, deleteUserFx.finally],
  target: getUsersFx,
})
