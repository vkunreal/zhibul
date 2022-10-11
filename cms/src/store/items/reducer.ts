import { ICategory, IItem } from './../../interfaces/Items'
import { ItemsActions } from './actions'
import { IItemsAction } from './interfaces'

export interface IItemsState {
  categories: ICategory[]
  items: IItem[]
}

const initState: IItemsState = {
  categories: [],
  items: [],
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

    default:
      return state
  }
}
