import { applyMiddleware, combineReducers, createStore } from 'redux'
import { IVariablesState, variablesReducer } from './variables/reducer'
import { IOptionsState, optionsReducer } from './options/reducer'
import { IItemsState, itemsReducer } from './items/reducer'
import { IPagesState, pagesReducer } from './pages/reducer'
import thunk from 'redux-thunk'

export interface IStore {
  items: IItemsState
  variables: IVariablesState
  options: IOptionsState
  pages: IPagesState
}

const middlewares = [thunk]

const rootReducer = combineReducers({
  variables: variablesReducer,
  items: itemsReducer,
  options: optionsReducer,
  pages: pagesReducer,
})

export const rootStore = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
