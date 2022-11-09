import { IOptionsState, optionsReducer } from './options/reducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { IItemsState, itemsReducer } from './items/reducer'

export interface IStore {
  items: IItemsState
  options: IOptionsState
}

const middlewares = [thunk]
const rootReducer = combineReducers({
  items: itemsReducer,
  options: optionsReducer,
})

export const rootStore = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
