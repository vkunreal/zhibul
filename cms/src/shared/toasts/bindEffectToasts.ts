import { Effect, sample } from 'effector'

import { ToastKind } from './interfaces'
import { toastShown } from './model'

type ToastText = {
  title: string
  description?: string
}

type BindEffectToastsConfig = {
  id: string
  loading: ToastText
  success: ToastText
  error: ToastText
}

export const bindEffectToasts = <Params, Done, Fail = Error>(
  effect: Effect<Params, Done, Fail>,
  { id, loading, success, error }: BindEffectToastsConfig,
) => {
  sample({
    clock: effect,
    fn: () => ({ id, kind: ToastKind.Loading, ...loading }),
    target: toastShown,
  })

  sample({
    clock: effect.done,
    fn: () => ({ id, kind: ToastKind.Success, ...success }),
    target: toastShown,
  })

  sample({
    clock: effect.fail,
    fn: () => ({ id, kind: ToastKind.Error, ...error }),
    target: toastShown,
  })
}
