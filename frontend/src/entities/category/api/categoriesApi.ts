import { httpClient } from '@/shared/api'
import { Category } from '@/shared/model'

const ENDPOINTS = {
  categories: '/api/categories/',
}

export const categoriesApi = {
  async getCategories() {
    const { data } = await httpClient.get<Category[]>({
      url: ENDPOINTS.categories,
    })

    return data
  },
}
