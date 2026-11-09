import { Item } from '@entities/items/model'

export interface ItemsViewProps {
  items: Item[]
  /** url выбранной категории, пустая строка — все товары. */
  categoryUrl: string
  /** Текущее значение инпута поиска по названию. */
  search: string
  loading: boolean
  onCategoryChange: (categoryUrl: string) => void
  onSearchChange: (search: string) => void
}
