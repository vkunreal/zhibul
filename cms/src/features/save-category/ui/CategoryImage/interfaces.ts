import { Category } from '@entities/items/model'

export interface CategoryImageProps {
  category: Category | null
  onFileChange: (file: File | null) => void
}
