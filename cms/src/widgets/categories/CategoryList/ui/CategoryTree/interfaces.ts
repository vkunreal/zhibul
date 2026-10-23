import { Category } from '@entities/items/model'

export interface CategoryTreeProps {
  categories: Category[]
  roots: Category[]
  getCategories: (parentId: number | null) => Category[]
  onAddChild: (id: number) => void
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}
