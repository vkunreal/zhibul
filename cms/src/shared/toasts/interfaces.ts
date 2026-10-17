export enum ToastKind {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export type Toast = {
  id: string
  kind: ToastKind
  title: string
  description?: string
}
