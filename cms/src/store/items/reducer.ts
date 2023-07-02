import { ICategory, ICountry, IItem } from './../../interfaces/Items'
import { ItemsActions } from './actions'
import { IItemsAction } from './interfaces'

export interface IItemsState {
  categories: ICategory[]
  items: IItem[]
  countries: ICountry[]
}

const initState: IItemsState = {
  categories: [],
  items: [],
  countries: [],
}

export const itemsReducer = (
  state = initState,
  { type, payload }: IItemsAction
): IItemsState => {
  switch (type) {
    case ItemsActions.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      }

    case ItemsActions.SET_ITEMS:
      return {
        ...state,
        items: payload,
      }

    case ItemsActions.SET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      }

    default:
      return state
  }
}
