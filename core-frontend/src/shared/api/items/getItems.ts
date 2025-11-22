import { apiGet } from '../base'
import { Item } from './item'

const ENDPOINTS = {
  items: '/api/items/',
  categoryItems: (slug: string) => `/api/items/${slug}`,
}

export const getCategoryItems = async (slug: string) => {
  const items = await apiGet<Item[]>(ENDPOINTS.categoryItems(slug), 3600)

  return items || []
}
