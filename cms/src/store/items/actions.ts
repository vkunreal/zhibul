import axios from 'axios'
import { Dispatch } from 'redux'
import { ICategory } from './../../interfaces/Items'

export enum ItemsActions {
  SET_CATEGORIES = 'ITEMS::SET_CATEGORIES',
}

const setCategories = (categories: ICategory) => ({
  type: ItemsActions.SET_CATEGORIES,
  payload: categories,
})

export const getCategoriesDB: any = () => async (dispatch: Dispatch) => {
  await axios.get('/api/categories').then(({ data }) => {
    dispatch(setCategories(data))
  })
}

export const addCategoryDB: any =
  (category: any) => async (dispatch: Dispatch) => {
    await axios.post('/api/category', category).then(() => {
      dispatch(getCategoriesDB())
    })
    console.log(category)
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
