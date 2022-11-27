import { IVariable } from '../../interfaces/App'
import { VariablesActions } from './actions'

export interface IChangeVariable {
  id?: number
  name: string
  value: string
}

interface ISetVariables {
  type: VariablesActions.SET_VARIABLES
  payload: IVariable[]
}

export type IVariablesAction = ISetVariables
