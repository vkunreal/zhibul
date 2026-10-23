import { ToastKind } from './interfaces'

export const TOAST_AUTO_HIDE_MS: Partial<Record<ToastKind, number>> = {
  [ToastKind.Success]: 4000,
  [ToastKind.Error]: 6000,
}

