import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Candidates } from './Candidates'
import { Items } from './Items'
import { Users } from './Users'

export const RoutesComp: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" />
        <Route path="/users" element={<Users />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  )
}
