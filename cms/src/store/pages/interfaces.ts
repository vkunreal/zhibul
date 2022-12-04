import { IPage } from '../../interfaces/App'
import { PagesActions } from './actions'

interface ISetPages {
  type: PagesActions.SET_PAGES
  payload: IPage[]
}

export type IPagesAction = ISetPages
