import { apiGet } from '@/shared/api'

import { News } from '..'

const ENDPOINTS = {
  news: '/api/news/',
  newsItem: (slug: string) => `/api/news/${slug}`,
}

export const newsApi = {
  async getNews() {
    const news = await apiGet<News[]>(ENDPOINTS.news)

    return news || []
  },

  async getNewsItem(slug: string) {
    const newsItem = await apiGet<News>(ENDPOINTS.newsItem(slug))

    return newsItem || null
  },
}
