import { OptionsActions } from './actions'
import { IOption } from '../../interfaces/Items'
import { IOptionsAction } from './interfaces'

export interface IOptionsState {
  options: IOption[]
}

const initState: IOptionsState = {
  options: [],
}

export const optionsReducer = (
  state = initState,
  { type, payload }: IOptionsAction
): IOptionsState => {
  switch (type) {
    case OptionsActions.SET_OPTIONS:
      return {
        ...state,
        options: payload,
      }
    default:
      return state
  }
}
