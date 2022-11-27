import { IVariable } from '../../interfaces/App'
import { IChangeVariable } from './interfaces'
import { Dispatch } from 'redux'
import axios from 'axios'

export enum VariablesActions {
  SET_VARIABLES = 'VARIABLES::SET_VARIABLES',
}

const setVariables = (options: IVariable[]) => ({
  type: VariablesActions.SET_VARIABLES,
  payload: options,
})

export const getVariablesDB: any = () => async (dispatch: Dispatch) => {
  await axios.get('/api/variables').then(({ data }) => {
    dispatch(setVariables(data))
  })
}

export const addVariableDB: any =
  (variable: IVariable) => async (dispatch: Dispatch) => {
    await axios.post('/api/variable', variable).then(() => {
      dispatch(getVariablesDB())
    })
  }

export const changeVariableDB: any =
  (variable: IChangeVariable) => async (dispatch: Dispatch) => {
    await axios.put('/api/variable', variable).then(() => {
      dispatch(getVariablesDB())
    })
  }

export const deleteVariableDB: any =
  (id: number) => async (dispatch: Dispatch) => {
    await axios.delete('/api/variable', { data: { id: id } }).then(() => {
      dispatch(getVariablesDB())
    })
  }
