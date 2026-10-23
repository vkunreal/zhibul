import { Category, CategorySortMode } from '@entities/items/model'

export interface CategoryFormValues {
  name: string
  url: string
  position: number
  description: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  sortMode: CategorySortMode
}

export interface CategoryMenuProps {
  category: Category | null
  onSubmit: (payload: {
    values: CategoryFormValues
    image: File | null
  }) => void
  isOpen: boolean
  onClose: () => void
}

export interface CreateCategoryPayload {
  values: CategoryFormValues
  parentId: number | null
  image: File | null
}

export interface ChangeCategoryPayload {
  values: CategoryFormValues
  category: Category
}

export interface CategoryImagePayload {
  id: number
  image: File
}
