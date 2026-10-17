import { Page } from '@entities/pages/model'

export const emptyPageForm: Page = {
  url: '',
  name: '',
  text: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
}

export const urlList = [
  { url: 'delivery', name: 'Доставка' },
  { url: 'contacts', name: 'Контакты' },
  { url: 'rembaza', name: 'Ремонт пневмоинструмента' },
  { url: 'index', name: 'Главная' },
  { url: 'uslugi', name: 'Услуги' },
  { url: 'katalog', name: 'Каталог' },
  { url: 'arenda_prizepa', name: 'Аренда автоприцепа' },
]
