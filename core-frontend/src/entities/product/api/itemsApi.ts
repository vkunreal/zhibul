import { apiGet } from '@/shared/api'

import { Item } from '..'

const ENDPOINTS = {
  items: '/api/items/',
  categoryItems: (slug: string) => `/api/items/${slug}`,
}

export const itemsApi = {
  async getCategoryItems(slug: string) {
    const items = await apiGet<Item[]>(ENDPOINTS.categoryItems(slug), 3600)

    return items || []
  },
}
