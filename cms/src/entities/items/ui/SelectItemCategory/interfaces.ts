import { CategoryOption } from '@entities/items/model'

export interface SelectItemCategoryProps {
  value?: string
  categories: CategoryOption[]
  category?: string
  onSelect: (category?: CategoryOption) => void
}
