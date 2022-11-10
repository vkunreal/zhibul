import { IOption } from '../../interfaces/Items'
import { OptionsActions } from './actions'

export interface IChangeOption {
  option_id?: number
  name: string
  value: string
}

interface ISetOptions {
  type: OptionsActions.SET_OPTIONS
  payload: IOption[]
}

export type IOptionsAction = ISetOptions
