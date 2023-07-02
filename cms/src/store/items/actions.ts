import axios from 'axios'
import { Dispatch } from 'redux'
import { ICategory, IItem, ICountry } from './../../interfaces/Items'

export enum ItemsActions {
  SET_CATEGORIES = 'ITEMS::SET_CATEGORIES',
  SET_ITEMS = 'ITEMS::SET_ITEMS',
  SET_COUNTRIES = 'ITEMS::SET_COUNTRIES',
}

const setCategories = (categories: ICategory) => ({
  type: ItemsActions.SET_CATEGORIES,
  payload: categories,
})

const setItems = (items: IItem) => ({
  type: ItemsActions.SET_ITEMS,
  payload: items,
})

const setCountries = (countries: ICountry) => ({
  type: ItemsActions.SET_COUNTRIES,
  payload: countries,
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

export const getItemsDB: any = () => async (dispatch: Dispatch) => {
  // await axios.get('/api/items').then(({ data }) => {
  //   dispatch(setItems(data))
  // })
  Promise.all([
    axios.get('/api/items/without-images'),
    axios.get('/api/countries'),
  ]).then((res) => {
    const [itemsData, countriesData] = res

    dispatch(setItems(itemsData.data))
    dispatch(setCountries(countriesData.data))

    console.log(itemsData)
  })
}

export const addItemDB: any = (item: IItem) => async (dispatch: Dispatch) => {
  await axios.post('/api/item', item).then(() => {
    dispatch(getItemsDB())
  })
}

export const changeItemDB: any =
  (item: IItem) => async (dispatch: Dispatch) => {
    await axios.put('/api/item/', item).then(() => {
      dispatch(getItemsDB())
    })
  }

export const deleteItemDB: any = (id: number) => async (dispatch: Dispatch) => {
  await axios.delete(`/api/item/${id}`).then(() => {
    dispatch(getItemsDB())
  })
}
