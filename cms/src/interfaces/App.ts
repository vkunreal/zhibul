export interface IVariable {
  id: number
  name: string
  value: string
}

export interface IPage {
  url: string
  name: string
  text: string
  seo_title: string
  seo_description: string
  seo_keywords: string
}

export const variablesList = [
  { type: 'phone', name: 'Телефон' },
  { type: 'address', name: 'Адрес' },
  { type: 'work_time', name: 'Время работы' },
  { type: 'years', name: 'Лет на рынке' },
  { type: 'clients', name: 'Клиентов' },
  { type: 'partners', name: 'Партнеров' },
  { type: 'repair_done', name: 'Сделано ремонта' },
]
