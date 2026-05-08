export interface GalleryImage {
  src: string
  is_main?: number
  position?: number
}

export interface GalleryProps {
  images?: GalleryImage[]
  alt: string
}
