import { IStore } from '..'

export const selectCategories = (store: IStore) => store.items.categories

export const selectItems = (store: IStore) => store.items.items
