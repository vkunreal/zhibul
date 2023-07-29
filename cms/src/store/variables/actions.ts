import { IVariable } from '../../interfaces/App'
import { IChangeVariable } from './interfaces'
import { Dispatch } from 'redux'
import axios from 'axios'
import { IStore } from '..'
import API from '../../utils/api'

export enum VariablesActions {
  SET_VARIABLES = 'VARIABLES::SET_VARIABLES',
  SET_TOKEN = 'VARIABLES::SET_TOKEN',
}

const setVariables = (options: IVariable[]) => ({
  type: VariablesActions.SET_VARIABLES,
  payload: options,
})

export const setToken = (token: string) => ({
  type: VariablesActions.SET_TOKEN,
  payload: token,
})

export const getVariablesDB: any =
  () => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .get(API + '/api/variables', {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(({ data }) => {
        dispatch(setVariables(data))
      })
  }

export const addVariableDB: any =
  (variable: IVariable) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .post(API + '/api/variable', variable, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getVariablesDB())
      })
  }

export const changeVariableDB: any =
  (variable: IChangeVariable) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .put(API + '/api/variable', variable, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getVariablesDB())
      })
  }

export const deleteVariableDB: any =
  (id: number) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .delete(API + '/api/variable', {
        headers: {
          authorization: getState().variables.token,
        },
        data: { id: id },
      })
      .then(() => {
        dispatch(getVariablesDB())
      })
  }

export const getTokenDB: any =
  (name: string, password: string) => async (dispatch: Dispatch) => {
    await axios
      .post(API + '/api/login', { name, password })
      .then(({ data: { token } }) => dispatch(setToken(token)))
  }
