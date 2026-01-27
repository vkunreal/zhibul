import { apiGet } from '../base'

import { NewsItem } from './news'

const ENDPOINTS = {
  news: '/api/news/',
}

export const getNews = async () => {
  const news = await apiGet<NewsItem[]>(ENDPOINTS.news, 3600)

  return news || []
}
