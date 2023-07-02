import { ICategory, ICountry, IItem } from './../../interfaces/Items'
import { ItemsActions } from './actions'

interface ISetCategories {
  type: ItemsActions.SET_CATEGORIES
  payload: ICategory[]
}

interface ISetItems {
  type: ItemsActions.SET_ITEMS
  payload: IItem[]
}

interface ISetCountries {
  type: ItemsActions.SET_COUNTRIES
  payload: ICountry[]
}

export type IItemsAction = ISetCategories | ISetItems | ISetCountries
