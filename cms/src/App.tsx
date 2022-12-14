import { RoutesComp } from './views/RoutesComp'
import { Provider } from 'react-redux'
import { rootStore } from './store'
import { Navbar } from './components/Navbar'
import './App.scss'

const App: React.FC = () => {
  return (
    <Provider store={rootStore}>
      <RoutesComp />
    </Provider>
  )
}

export default App
