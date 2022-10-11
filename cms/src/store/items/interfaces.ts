import { ICategory, IItem } from './../../interfaces/Items'
import { ItemsActions } from './actions'

interface ISetCategories {
  type: ItemsActions.SET_CATEGORIES
  payload: ICategory[]
}

interface ISetItems {
  type: ItemsActions.SET_ITEMS
  payload: IItem[]
}

export type IItemsAction = ISetCategories | ISetItems
