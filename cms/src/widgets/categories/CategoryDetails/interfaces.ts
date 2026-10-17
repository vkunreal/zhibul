import { Category } from '@entities/items/model'

export interface CategoryDetailsProps {
  categories: Category[]
  category: Category
  depth?: number
  getCategories: (id: number) => Category[]
  setDeletedCategory: (category: Category) => void
  setChangedCategory: (category: Category) => void
  setParentId: (id: number) => void
}
