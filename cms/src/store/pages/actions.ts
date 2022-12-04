import { IPage } from '../../interfaces/App'
import { Dispatch } from 'redux'
import axios from 'axios'

export enum PagesActions {
  SET_PAGES = 'VARIABLES::SET_PAGES',
}

const setPages = (pages: IPage[]) => ({
  type: PagesActions.SET_PAGES,
  payload: pages,
})

export const getPagesDB: any = () => async (dispatch: Dispatch) => {
  await axios.get('/api/pages').then(({ data }) => {
    dispatch(setPages(data))
  })
}

export const addPagesDB: any =
  (variable: IPage) => async (dispatch: Dispatch) => {
    await axios.post('/api/page', variable).then(() => {
      dispatch(getPagesDB())
    })
  }

export const changePageDB: any =
  (variable: IPage) => async (dispatch: Dispatch) => {
    await axios.put('/api/page', variable).then(() => {
      dispatch(getPagesDB())
    })
  }

export const deletePageDB: any =
  (url: string) => async (dispatch: Dispatch) => {
    await axios.delete('/api/page', { data: { url } }).then(() => {
      dispatch(getPagesDB())
    })
  }
