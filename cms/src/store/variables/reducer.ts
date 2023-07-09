import { VariablesActions } from './actions'
import { IVariable } from '../../interfaces/App'
import { IVariablesAction } from './interfaces'

export interface IVariablesState {
  variables: IVariable[]
  token: string
}

const initState: IVariablesState = {
  variables: [],
  token: '',
}

export const variablesReducer = (
  state = initState,
  { type, payload }: IVariablesAction
): IVariablesState => {
  switch (type) {
    case VariablesActions.SET_VARIABLES:
      return {
        ...state,
        variables: payload,
      }
    case VariablesActions.SET_TOKEN:
      return {
        ...state,
        token: payload,
      }
    default:
      return state
  }
}
