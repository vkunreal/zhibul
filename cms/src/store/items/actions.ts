import axios from 'axios'
import { Dispatch } from 'redux'
// import { IStore } from "..";
import { ICategory } from './../../interfaces/Items'

export enum ItemsActions {
  SET_CATEGORIES = 'ITEMS::SET_CATEGORIES',
  ADD_CATEGORY = 'ITEMS::ADD_CATEGORY',
  CHANGE_CATEGORY = 'ITEMS::CHANGE_CATEGORY',
  DELETE_CATEGORY = 'ITEMS::DELETE_CATEGORY',
}

const setCategories = (categories: ICategory) => ({
  type: ItemsActions.SET_CATEGORIES,
  payload: categories,
})

const addCategory = (category: ICategory) => ({
  type: ItemsActions.ADD_CATEGORY,
  payload: category,
})

const changeCategory = (category: ICategory) => ({
  type: ItemsActions.CHANGE_CATEGORY,
  payload: category,
})

const deleteCategory = (id: number) => ({
  type: ItemsActions.DELETE_CATEGORY,
  payload: id,
})
// getState: () => IStore
export const getCategoriesDB: any = () => async (dispatch: Dispatch) => {
  await axios.get('/api/categories').then(({ data }) => {
    dispatch(setCategories(data))
  })
}

export const changeCategoryDB: any =
  (id: number, name: string) => async (dispatch: Dispatch) => {
    await axios.put('/api/category', { id, name }).then(() => {
      dispatch(getCategoriesDB())
    })
  }

export const deleteCategoryDB: any =
  (id: number) => async (dispatch: Dispatch) => {
    await axios.delete('/api/category/' + id).then(() => {
      dispatch(getCategoriesDB())
    })
  }
