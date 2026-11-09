import type { Page } from '@/shared/model'

import { httpClient } from '../httpClient'

const ENDPOINTS = {
  page: (page: string) => `/api/pages/${page}/`,
}

export const getPage = async (page: string) => {
  const { data } = await httpClient.get<Page>({ url: ENDPOINTS.page(page) })

  return data
}
