import { createEffect, createEvent, sample } from 'effector'
import { createGate } from 'effector-react'

import { login } from '@shared/api'
import { $token } from '@shared/auth'
import { navigateFx } from '@shared/navigation'

import { LoginFormValues } from './interfaces'

export const AuthGate = createGate()

export const formSubmitted = createEvent<LoginFormValues>()

export const loginFx = createEffect(login)

const isAuthorized = () => !!$token.getState()

const canSubmit = ({ name, password }: LoginFormValues) =>
  !!name.trim() && !!password.trim()

sample({
  clock: loginFx.doneData,
  target: $token,
})

sample({
  clock: AuthGate.open,
  filter: isAuthorized,
  fn: () => '/home',
  target: navigateFx,
})

sample({
  clock: formSubmitted,
  filter: canSubmit,
  target: loginFx,
})

sample({
  clock: formSubmitted,
  filter: canSubmit,
  fn: () => '/home',
  target: navigateFx,
})
