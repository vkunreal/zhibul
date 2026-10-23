import { PropsWithChildren } from 'react'

export type FetchStateProps = PropsWithChildren<{
  loading: boolean
  empty: boolean
  emptyText: string
  framed?: boolean
}>
