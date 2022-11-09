import { IOption } from './../../interfaces/Items'
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
