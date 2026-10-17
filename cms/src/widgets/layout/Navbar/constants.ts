import type { SvgIconComponent } from '@mui/icons-material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'

export interface NavRoute {
  name: string
  url: string
  description: string
  Icon: SvgIconComponent
}

export const homeRoute: NavRoute = {
  name: 'Главная',
  url: '/home',
  description: 'Стартовое меню разделов',
  Icon: HomeOutlinedIcon,
}

export const routes: NavRoute[] = [
  {
    name: 'Валюты',
    url: '/valutes',
    description: 'Курсы валют относительно BYN',
    Icon: CurrencyExchangeOutlinedIcon,
  },
  {
    name: 'Переменные',
    url: '/variables',
    description: 'Контакты и статические данные сайта',
    Icon: TuneOutlinedIcon,
  },
  {
    name: 'Пользователи',
    url: '/users',
    description: 'Заявки и контакты с форм обратной связи',
    Icon: PeopleOutlinedIcon,
  },
  {
    name: 'Категории',
    url: '/categories',
    description: 'Структура каталога и видимость разделов',
    Icon: CategoryOutlinedIcon,
  },
  {
    name: 'Товары',
    url: '/items',
    description: 'Каталог позиций, цены и статусы',
    Icon: Inventory2OutlinedIcon,
  },
  {
    name: 'Страницы',
    url: '/pages',
    description: 'Статический контент и SEO страниц',
    Icon: ArticleOutlinedIcon,
  },
  {
    name: 'Новости',
    url: '/news',
    description: 'Публикации и SEO-данные новостей',
    Icon: NewspaperOutlinedIcon,
  },
]

/** Пункты бокового меню: главная + разделы. */
export const navRoutes: NavRoute[] = [homeRoute, ...routes]
