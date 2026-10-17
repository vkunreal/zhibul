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

interface CategoryMenuBaseProps {
  isOpen: boolean
  onClose: () => void
}

export interface CreateCategoryMenuProps extends CategoryMenuBaseProps {
  category?: undefined
  parentId: number | null
}

export interface EditCategoryMenuProps extends CategoryMenuBaseProps {
  category: Category
  parentId?: never
}

export type CategoryMenuProps = CreateCategoryMenuProps | EditCategoryMenuProps

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
