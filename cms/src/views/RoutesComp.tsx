import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Variables } from './Variables'
import { Users } from './Users'
import { Candidates } from './Candidates'
import { Items } from './Items'
import { Configure } from './Configure'
import { Pages } from './Pages'
import './RoutesComp.scss'
import { useSelector } from 'react-redux'
import { selectToken } from '../store/variables/selectors'
import { AuthPage } from './Auth'

export const RoutesComp: React.FC = () => {
  const token = useSelector(selectToken)

  return (
    <BrowserRouter>
      <div className="routes d-flex g-2">
        <div className="routes__navbar">
          <Navbar />
        </div>

        <div className="routes__content">
          <Routes>
            <Route path="/" />
            <Route
              path="/variables"
              element={!token ? <AuthPage /> : <Variables />}
            />
            <Route path="/users" element={!token ? <AuthPage /> : <Users />} />
            <Route
              path="/candidates"
              element={!token ? <AuthPage /> : <Candidates />}
            />
            <Route path="/items" element={!token ? <AuthPage /> : <Items />} />
            <Route
              path="/configure"
              element={!token ? <AuthPage /> : <Configure />}
            />
            <Route path="/pages" element={!token ? <AuthPage /> : <Pages />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
