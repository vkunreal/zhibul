import { Link } from 'react-router-dom'
import './styles.scss'

const routes = [
  { name: 'Пользователи', url: '/users' },
  { name: 'Кандидаты', url: '/candidates' },
  { name: 'Категории', url: '/items' },
]

export const Navbar: React.FC = () => {
  return (
    <div className="navbar d-flex flex-column align-center pd-2 mt-4 g-2">
      {routes.map((route) => (
        <Link
          className="navbar__link fill-width text-center"
          key={route.url}
          to={route.url}
        >
          {route.name}
        </Link>
      ))}
    </div>
  )
}
