import { VariablesActions } from './actions'
import { IVariable } from '../../interfaces/App'
import { IVariablesAction } from './interfaces'

export interface IVariablesState {
  variables: IVariable[]
}

const initState: IVariablesState = {
  variables: [],
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
    default:
      return state
  }
}
