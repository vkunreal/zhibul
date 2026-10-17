import { createEvent, createStore } from 'effector'

import { Toast } from './interfaces'

export const toastShown = createEvent<Toast>()
export const toastHidden = createEvent<string>()

export const $toasts = createStore<Toast[]>([])
  .on(toastShown, (toasts, toast) => {
    const index = toasts.findIndex((item) => item.id === toast.id)
    if (index === -1) return [...toasts, toast]

    const next = [...toasts]
    next[index] = toast
    return next
  })
  .on(toastHidden, (toasts, id) => toasts.filter((toast) => toast.id !== id))
