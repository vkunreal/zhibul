import { apiGet } from '../base'
import { Category } from './category'

const ENDPOINTS = {
  categories: '/api/categories/',
}

export const getCategories = async () => {
  const pageData = await apiGet<Category[]>(ENDPOINTS.categories, 3600)

  return pageData
}
