import { ReactNode } from 'react'

export interface GalleryProps {
  loading?: boolean
  empty: boolean
  emptyText: string
  children?: ReactNode
}
