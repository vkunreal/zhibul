import type { Page } from '@/shared/interfaces'
import { apiGet } from '../base'

const ENDPOINTS = {
  page: (page: string) => `/api/pages/${page}/`,
}

export const getPage = async (page: string) => {
  const pageData = await apiGet<Page>(ENDPOINTS.page(page), 3600)

  return pageData
}
