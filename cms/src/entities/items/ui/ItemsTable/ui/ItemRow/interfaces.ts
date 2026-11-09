import { Item } from '@entities/items/model'

export interface ItemRowProps {
  item: Item
  onConfigure: () => void
  onEdit: () => void
  onCopy: () => void
  onDelete: () => void
}
