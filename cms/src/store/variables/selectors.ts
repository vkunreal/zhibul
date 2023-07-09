import { IStore } from '..'

export const selectVariables = (store: IStore) => store.variables.variables

export const selectToken = (store: IStore) => store.variables.token
