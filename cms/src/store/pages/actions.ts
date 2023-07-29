import { IPage } from '../../interfaces/App'
import { Dispatch } from 'redux'
import axios from 'axios'
import { IStore } from '..'
import API from '../../utils/api'

export enum PagesActions {
  SET_PAGES = 'VARIABLES::SET_PAGES',
}

const setPages = (pages: IPage[]) => ({
  type: PagesActions.SET_PAGES,
  payload: pages,
})

export const getPagesDB: any = () => async (dispatch: Dispatch) => {
  await axios.get(API + '/api/pages').then(({ data }) => {
    dispatch(setPages(data))
  })
}

export const addPagesDB: any =
  (variable: IPage) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .post(API + '/api/page', variable, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getPagesDB())
      })
  }

export const changePageDB: any =
  (variable: IPage) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .put(API + '/api/page', variable, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getPagesDB())
      })
  }

export const deletePageDB: any =
  (url: string) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .delete(API + '/api/page', {
        headers: {
          authorization: getState().variables.token,
        },
        data: { url },
      })
      .then(() => {
        dispatch(getPagesDB())
      })
  }
