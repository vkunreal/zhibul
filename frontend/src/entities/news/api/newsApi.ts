import { httpClient } from '@/shared/api'

import { News } from '..'

const ENDPOINTS = {
  news: '/api/news/',
  newsItem: (slug: string) => `/api/news/${slug}`,
}

export const newsApi = {
  async getNews() {
    const { data } = await httpClient.get<News[]>({ url: ENDPOINTS.news })

    return data || []
  },

  async getNewsItem(slug: string) {
    const { data } = await httpClient.get<News>({
      url: ENDPOINTS.newsItem(slug),
    })

    return data || null
  },
}
