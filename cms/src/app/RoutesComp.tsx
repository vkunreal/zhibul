import { useUnit } from 'effector-react'
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router'

import { $token } from '@shared/auth'
import { history } from '@shared/navigation'
import { AuthPage } from '@views/Auth'
import { Candidates } from '@views/Candidates'
import { Categories } from '@views/Categories'
import { Configure } from '@views/Configure'
import { Home } from '@views/Home'
import { Items } from '@views/Items'
import { News } from '@views/News'
import { NewsConfigure } from '@views/NewsConfigure'
import { NotFound } from '@views/NotFound'
import { Pages } from '@views/Pages'
import { Users } from '@views/Users'
import { Valutes } from '@views/Valutes'
import { Variables } from '@views/Variables'
import { Navbar } from '@widgets/layout/Navbar'

import './RoutesComp.scss'

export const RoutesComp: React.FC = () => {
  const token = useUnit($token)

  return (
    <HistoryRouter history={history}>
      <div className='routes d-flex'>
        <div className='routes__navbar'>
          <Navbar />
        </div>

        <div className='routes__content'>
          <Routes>
            <Route
              path='/'
              element={
                !token ? <AuthPage /> : <Navigate to='/home' replace />
              }
            />
            <Route
              path='/home'
              element={!token ? <AuthPage /> : <Home />}
            />
            <Route
              path='/valutes'
              element={!token ? <AuthPage /> : <Valutes />}
            />
            <Route
              path='/variables'
              element={!token ? <AuthPage /> : <Variables />}
            />
            <Route path='/users' element={!token ? <AuthPage /> : <Users />} />
            <Route
              path='/candidates'
              element={!token ? <AuthPage /> : <Candidates />}
            />
            <Route
              path='/categories'
              element={!token ? <AuthPage /> : <Categories />}
            />
            <Route path='/items' element={!token ? <AuthPage /> : <Items />} />
            <Route
              path='/items/:url'
              element={!token ? <AuthPage /> : <Items />}
            />
            <Route
              path='/configure/:item_id'
              element={!token ? <AuthPage /> : <Configure />}
            />
            <Route path='/news' element={!token ? <AuthPage /> : <News />} />
            <Route
              path='/news/:news_id'
              element={!token ? <AuthPage /> : <NewsConfigure />}
            />
            <Route path='/pages' element={!token ? <AuthPage /> : <Pages />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </HistoryRouter>
  )
}
