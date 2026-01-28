import { apiGet } from '@/shared/api'

import { Category } from '..'

const ENDPOINTS = {
  categories: '/api/categories/',
}

export const categoriesApi = {
  async getCategories() {
    const pageData = await apiGet<Category[]>(ENDPOINTS.categories, 3600)

    return pageData
  },
}
