import axios from "axios";
import { Dispatch } from "redux";
import { ICategory, IItem, ICountry } from "./../../interfaces/Items";
import { IStore } from "..";
import API from "../../utils/api";

export enum ItemsActions {
  SET_CATEGORIES = "ITEMS::SET_CATEGORIES",
  SET_ITEMS = "ITEMS::SET_ITEMS",
  SET_COUNTRIES = "ITEMS::SET_COUNTRIES",
}

const setCategories = (categories: ICategory) => ({
  type: ItemsActions.SET_CATEGORIES,
  payload: categories,
});

const setItems = (items: IItem, itemPages: number) => ({
  type: ItemsActions.SET_ITEMS,
  payload: { items, itemPages },
});

const setCountries = (countries: ICountry) => ({
  type: ItemsActions.SET_COUNTRIES,
  payload: countries,
});

export const getCategoriesDB: any = () => async (dispatch: Dispatch) => {
  await axios.get(API + "/api/categories").then(({ data }) => {
    dispatch(setCategories(data));
  });
};

export const addCategoryDB: any =
  (category: any, imageData: any) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    const response = await axios
      .post(API + "/api/category", category, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then((res) => {
        dispatch(getCategoriesDB());
        return res.data;
      });

    await fetch(API + "/api/category/image/" + response.data.id, {
      method: "POST",
      body: imageData,
      headers: {
        authorization: getState().variables.token,
      },
    });
  };

export const changeCategoryDB: any =
  (category: ICategory) =>
  async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .put(API + "/api/category", category, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getCategoriesDB());
      });
  };

export const deleteCategoryDB: any =
  (id: number) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .delete(API + "/api/category/" + id, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getCategoriesDB());
      });
  };

export const getItemsDB: any = (page: number) => async (dispatch: Dispatch) => {
  // await axios.get('/api/items').then(({ data }) => {
  //   dispatch(setItems(data))
  // })
  Promise.all([
    // axios.get(API + `/api/items-splitted?page=${page}&limit=20`),
    axios.get(API + `/api/items/without-images`),
    axios.get(API + "/api/countries"),
  ]).then((res) => {
    const [itemsData, countriesData] = res;

    // const { data: items, count } = itemsData.data;

    // dispatch(setItems(items, Math.ceil(count / 20)));
    dispatch(setItems(itemsData.data, 1));
    dispatch(setCountries(countriesData.data));
  });
};

export const addItemDB: any =
  (item: IItem) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .post(API + "/api/item", item, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getItemsDB());
      });
  };

export const changeItemDB: any =
  (item: IItem) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .put(API + "/api/item/", item, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getItemsDB());
      });
  };

export const deleteItemDB: any =
  (id: number) => async (dispatch: Dispatch, getState: () => IStore) => {
    await axios
      .delete(`${API}/api/item/${id}`, {
        headers: {
          authorization: getState().variables.token,
        },
      })
      .then(() => {
        dispatch(getItemsDB());
      });
  };
