import { RoutesComp } from './views/RoutesComp'
import { Provider } from 'react-redux'
import { persistor, rootStore } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.scss'

const App: React.FC = () => {
  return (
    <Provider store={rootStore}>
      <PersistGate persistor={persistor}>
        <RoutesComp />
      </PersistGate>
    </Provider>
  )
}

export default App
