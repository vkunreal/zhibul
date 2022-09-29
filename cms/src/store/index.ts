import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { IItemsState, itemsReducer } from './items/reducer'

export interface IStore {
  items: IItemsState
}

const middlewares = [thunk]
const rootReducer = combineReducers({
  items: itemsReducer,
})

export const rootStore = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
