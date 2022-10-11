import { NavLink } from 'react-router-dom'
import './styles.scss'

const routes = [
  { name: 'Пользователи', url: '/users' },
  { name: 'Кандидаты', url: '/candidates' },
  { name: 'Товары', url: '/items' },
]

export const Navbar: React.FC = () => {
  return (
    <div className="navbar d-flex flex-column align-center pd-2 mt-4 g-2">
      {routes.map((route) => (
        <NavLink
          className={({ isActive }) =>
            `navbar__link fill-width text-center ${isActive && 'active'}`
          }
          key={route.url}
          to={route.url}
        >
          {route.name}
        </NavLink>
      ))}
    </div>
  )
}
