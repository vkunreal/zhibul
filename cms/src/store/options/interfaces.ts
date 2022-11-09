import { IOption } from '../../interfaces/Items'
import { OptionsActions } from './actions'

interface ISetOptions {
  type: OptionsActions.SET_OPTIONS
  payload: IOption[]
}

export type IOptionsAction = ISetOptions
