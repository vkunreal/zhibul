import { apiGet } from '@/shared/api'

import { Item, ItemOption } from '..'

export const itemsApi = {
  endpoints: {
    items: '/api/items/',
    categoryItems: (slug: string) => `/api/items/${slug}`,
    item: (slug: string) => `/api/item/${slug}`,
    itemOptions: (id: number) => `/api/options/${id}`,
  },

  async getAllItems() {
    const items = await apiGet<Item[]>(this.endpoints.items)

    return items || []
  },

  async getCategoryItems(slug: string) {
    const items = await apiGet<Item[]>(this.endpoints.categoryItems(slug))

    return items || []
  },

  async getItem(slug: string) {
    const item = await apiGet<Item>(this.endpoints.item(slug))

    return item || null
  },

  async getItemOptions(id: number) {
    const options = await apiGet<ItemOption[]>(this.endpoints.itemOptions(id))

    return options || []
  },
}
