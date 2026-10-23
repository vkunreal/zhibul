import { Item } from '@entities/items/model'

export interface ItemsTableProps {
  items: Item[]
  loading?: boolean
  setDeleteItem: (item: Item) => void
  setChangeItem: (item: Item) => void
  setCopyItem: (item: Item) => void
}
