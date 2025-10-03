import { IStore } from "..";

export const selectCategories = (store: IStore) => store.items.categories;

export const selectItems = (store: IStore) => store.items.items;

export const selectItemPages = (store: IStore) => store.items.itemPages;

export const selectCountries = (store: IStore) => store.items.countries;
