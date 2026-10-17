export interface ItemOption {
  id: number
  itemId: number
  position: number
  name: string
  value: string
  /** Показывать на странице товара. */
  showItem: boolean
  /** Показывать в карточке каталога. */
  showMenu: boolean
  /** Значение вида `1.1-1.2-1.3` выводится выпадающим списком. */
  isDropdown: boolean
}

export interface OptionPosition {
  id: number
  position: number
}
