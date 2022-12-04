import { PagesActions } from './actions'
import { IPage } from '../../interfaces/App'
import { IPagesAction } from './interfaces'

export interface IPagesState {
  pages: IPage[]
}

const initState: IPagesState = {
  pages: [],
}

export const pagesReducer = (
  state = initState,
  { type, payload }: IPagesAction
): IPagesState => {
  switch (type) {
    case PagesActions.SET_PAGES:
      return {
        ...state,
        pages: payload,
      }
    default:
      return state
  }
}
