import { createEffect } from 'effector'

import { authApi } from '@/entities/auth'

import { CodeRequest } from './interfaces'

/** Запрос SMS. В API уходят цифры, в params остаются маска и номер попытки. */
export const requestCodeFx = createEffect(({ phoneNumber }: CodeRequest) =>
  authApi.getAuthCode(phoneNumber),
)
