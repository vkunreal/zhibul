import { CategoryOption, Item } from '@entities/items/model'
import { Valute } from '@entities/valutes/model'

export interface ItemFormValues {
  categoryId: number
  categoryName: string
  url: string
  position: number
  name: string
  description: string
  brand: string
  /** Название страны: так значение показывается в Select. */
  manufacturer: string
  price: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  /** id валюты строкой: так значение хранится в Select. */
  valute: string
  purchase: string
  profitability: string
  postfix: string
  isActive: boolean
  isOrderOnly: boolean
}

export interface ItemMenuProps {
  item: Item | null
  categories: CategoryOption[]
  valutes: Valute[]
  onSubmit: (values: ItemFormValues) => void
  isOpen: boolean
  onClose: () => void
}

export interface ChangeItemPayload {
  values: ItemFormValues
  item: Item
}
