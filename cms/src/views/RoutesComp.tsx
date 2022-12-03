import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Variables } from './Variables'
import { Users } from './Users'
import { Candidates } from './Candidates'
import { Items } from './Items'
import { Configure } from './Configure'
import { Pages } from './Pages'
import './RoutesComp.scss'

export const RoutesComp: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="routes d-flex g-2">
        <div className="routes__navbar">
          <Navbar />
        </div>

        <div className="routes__content">
          <Routes>
            <Route path="/" />
            <Route path="/variables" element={<Variables />} />
            <Route path="/users" element={<Users />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/items" element={<Items />} />
            <Route path="/configure" element={<Configure />} />
            <Route path="/pages" element={<Pages />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
