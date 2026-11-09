import { Item } from '@entities/items/model'

export interface ConfigurePropertiesProps {
  item: Item
  valuteTitle?: string
  onEdit: () => void
}

export interface StatusValueProps {
  on: boolean
  label: string
}
