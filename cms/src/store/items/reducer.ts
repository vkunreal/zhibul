import { ICategory } from './../../interfaces/Items'
import { ItemsActions } from './actions'

export interface IItemsState {
  categories: ICategory[]
}

const initState: IItemsState = {
  categories: [],
}

export const itemsReducer = (
  state = initState,
  { type, payload }: any
): IItemsState => {
  switch (type) {
    case ItemsActions.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      }

    default:
      return state
  }
}
