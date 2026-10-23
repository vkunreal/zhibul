import { ReactNode } from 'react'

export interface GalleryImage {
  src: string
}

export interface EditableImageGalleryProps<T extends GalleryImage> {
  images: T[]
  loading?: boolean
  emptyText?: string
  onUpload: (files: File[]) => void
  onRemove?: (image: T) => void
  renderImage?: (image: T, editing: boolean) => ReactNode
}
