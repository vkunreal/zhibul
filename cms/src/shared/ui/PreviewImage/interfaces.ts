import { ReactNode } from 'react'

export interface PreviewImageProps {
  src: string
  pending?: boolean
  onRemove?: () => void
  children?: ReactNode
}
