import { apiGet } from '@/shared/api'

import { News } from '..'

const ENDPOINTS = {
  news: '/api/news/',
}

export const newsApi = {
  async getNews() {
    const news = await apiGet<News[]>(ENDPOINTS.news, 3600)

    return news || []
  },
}
