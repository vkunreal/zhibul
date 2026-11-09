import { Category } from '@entities/items/model'

export interface CategoryRowProps {
  category: Category
  depth: number
  open: boolean
  hasChildren: boolean
  onToggle: () => void
  onActiveChange: (active: boolean) => void
  siteUrl: string
  onAdd: () => void
  onEdit: () => void
  onDelete: () => void
}
