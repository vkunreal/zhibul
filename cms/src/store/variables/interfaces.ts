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

interface ISetToken {
  type: VariablesActions.SET_TOKEN
  payload: string
}

export type IVariablesAction = ISetVariables | ISetToken
