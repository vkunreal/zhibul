import { IOption, IOptionPosition } from './../../interfaces/Items'
import { IChangeOption } from './interfaces'
import { Dispatch } from 'redux'
import axios from 'axios'
import { IStore } from '..'
import API from '../../utils/api'

export enum OptionsActions {
  SET_OPTIONS = 'OPTIONS::SET_OPTIONS',
}

const setOptions = (options: IOption[]) => ({
  type: OptionsActions.SET_OPTIONS,
  payload: options,
})

export const getOptionsDB: any =
  (item_id: number) => async (dispatch: Dispatch) => {
    await axios.get(API + '/api/options/' + item_id).then(({ data }) => {
      dispatch(setOptions(data))
    })
  }

export const addOptionDB: any =
  (option: IOption, item_id: number) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .post(API + '/api/option', option, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(({ data }) => {
        console.log(data)
        dispatch(getOptionsDB(item_id))
      })
  }

export const changeOptionDB: any =
  (option: IChangeOption, item_id: number) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .put(API + '/api/option', option, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(({ data }) => {
        console.log(data)
        dispatch(getOptionsDB(item_id))
      })
  }

export const changePositionsDB: any =
  (positions: IOptionPosition[], item_id: number) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .put(API + '/api/option/positions', positions, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(({ data }) => {
        console.log(data)
        dispatch(getOptionsDB(item_id))
      })
  }

export const deleteOptionDB: any =
  (id: number, item_id: number) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .delete(API + '/api/option', {
        headers: {
          authorization: getState().variables.token,
        },
        data: { option_id: id },
      })
      .then(({ data }) => {
        console.log(data)
        dispatch(getOptionsDB(item_id))
      })
  }
