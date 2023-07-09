import { applyMiddleware, combineReducers, createStore } from 'redux'
import { IVariablesState, variablesReducer } from './variables/reducer'
import { IOptionsState, optionsReducer } from './options/reducer'
import { IItemsState, itemsReducer } from './items/reducer'
import { IPagesState, pagesReducer } from './pages/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

export interface IStore {
  items: IItemsState
  variables: IVariablesState
  options: IOptionsState
  pages: IPagesState
}

const middlewares = [thunk]

const persistConfig = {
  key: 'root',
  blacklist: ['items', 'options', 'pages'],
  storage,
}

const rootReducer = combineReducers({
  variables: variablesReducer,
  items: itemsReducer,
  options: optionsReducer,
  pages: pagesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const rootStore = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
)

export const persistor = persistStore(rootStore)
