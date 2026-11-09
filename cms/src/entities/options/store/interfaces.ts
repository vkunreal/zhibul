import { OptionPosition } from '../model'

export interface NewOptionValues {
  itemId: number
  name: string
  value: string
  position: number
}

export interface OptionChanges {
  itemId: number
  optionId: number
  name: string
  value: string
  isDropdown: boolean
  showMenu: boolean
}

/** Запрос по опции; `itemId` нужен, чтобы перезагрузить опции товара. */
export interface OptionRequest<Body> {
  itemId: number
  option: Body
}

export interface OptionPositionsChange {
  itemId: number
  positions: OptionPosition[]
}

export interface OptionRef {
  itemId: number
  id: number
}
