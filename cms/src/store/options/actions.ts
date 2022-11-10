import { IOption, IOptionPosition } from './../../interfaces/Items'
import { IChangeOption } from './interfaces'
import { Dispatch } from 'redux'
import axios from 'axios'

export enum OptionsActions {
  SET_OPTIONS = 'OPTIONS::SET_OPTIONS',
}

const setOptions = (options: IOption[]) => ({
  type: OptionsActions.SET_OPTIONS,
  payload: options,
})

export const getOptionsDB: any =
  (item_id: number) => async (dispatch: Dispatch) => {
    await axios.get('/api/options/' + item_id).then(({ data }) => {
      dispatch(setOptions(data))
    })
  }

export const addOptionDB: any =
  (option: IOption, item_id: number) => async (dispatch: Dispatch) => {
    await axios.post('/api/option', option).then(({ data }) => {
      console.log(data)
      dispatch(getOptionsDB(item_id))
    })
  }

export const changeOptionDB: any =
  (option: IChangeOption, item_id: number) => async (dispatch: Dispatch) => {
    await axios.put('/api/option', option).then(({ data }) => {
      console.log(data)
      dispatch(getOptionsDB(item_id))
    })
  }

export const changePositionsDB: any =
  (positions: IOptionPosition[], item_id: number) =>
  async (dispatch: Dispatch) => {
    await axios.put('/api/option/positions', positions).then(({ data }) => {
      console.log(data)
      dispatch(getOptionsDB(item_id))
    })
  }

export const deleteOptionDB: any =
  (id: number, item_id: number) => async (dispatch: Dispatch) => {
    await axios
      .delete('/api/option', { data: { option_id: id } })
      .then(({ data }) => {
        console.log(data)
        dispatch(getOptionsDB(item_id))
      })
  }
