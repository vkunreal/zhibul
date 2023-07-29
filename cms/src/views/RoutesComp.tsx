import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Variables } from './Variables'
import { Users } from './Users'
import { Candidates } from './Candidates'
import { Items } from './Items'
import { Configure } from './Configure'
import { Pages } from './Pages'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../store/variables/selectors'
import { AuthPage } from './Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { setToken } from '../store/variables/actions'
import API from '../utils/api'
import './RoutesComp.scss'

export const RoutesComp: React.FC = () => {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      const tokenStatus = await axios
        .post(API + '/api/protect', { token })
        .then((res) => res.data.status)

      if (!tokenStatus) {
        dispatch(setToken(''))
      }
    }
    fetch()
    console.log(API)
  }, [])

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
