import { ToastKind } from './interfaces'

export const TOAST_AUTO_HIDE_MS: Partial<Record<ToastKind, number>> = {
  [ToastKind.Success]: 4000,
  [ToastKind.Error]: 6000,
}

export const TOAST_ACCENT: Record<ToastKind, string> = {
  [ToastKind.Loading]: '#1976d2',
  [ToastKind.Success]: '#2e7d32',
  [ToastKind.Error]: '#d32f2f',
}
