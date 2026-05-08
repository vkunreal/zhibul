import { apiGet } from '@/shared/api'
import { Category } from '@/shared/model'

const ENDPOINTS = {
  categories: '/api/categories/',
}

export const categoriesApi = {
  async getCategories() {
    const pageData = await apiGet<Category[]>(ENDPOINTS.categories, 3600)

    return pageData
  },
}
