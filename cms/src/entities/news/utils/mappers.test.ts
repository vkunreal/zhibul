import { describe, expect, it } from 'vitest'

import type { NewsDTO } from '@shared/api'

import { toNews, toNewsMedia, toSaveNewsDTO } from './mappers'

const newsDto = (): NewsDTO => ({
  id: 4,
  url: 'launch',
  title: 'Запуск',
  text: '<p>Полный текст</p>',
  short_text: 'Кратко',
  date: '1710000000000',
  seo_title: 'seo',
  seo_description: 'seo desc',
  seo_keywords: 'news',
  media: [{ news_id: 4, src: '/n.jpg', position: 0 }],
})

describe('news mappers', () => {
  it('toNewsMedia мапит медиа', () => {
    expect(toNewsMedia({ news_id: 4, src: '/n.jpg', position: 2 })).toEqual({
      newsId: 4,
      src: '/n.jpg',
      position: 2,
    })
  })

  it('toNews мапит новость и вложенные медиа', () => {
    expect(toNews(newsDto())).toEqual({
      id: 4,
      url: 'launch',
      title: 'Запуск',
      text: '<p>Полный текст</p>',
      shortText: 'Кратко',
      date: 1710000000000,
      seoTitle: 'seo',
      seoDescription: 'seo desc',
      seoKeywords: 'news',
      media: [{ newsId: 4, src: '/n.jpg', position: 0 }],
    })
  })

  it('toSaveNewsDTO собирает payload сохранения', () => {
    expect(
      toSaveNewsDTO({
        url: 'launch',
        title: 'Запуск',
        text: '<p>x</p>',
        shortText: 'short',
        seoTitle: 't',
        seoDescription: 'd',
        seoKeywords: 'k',
      }),
    ).toEqual({
      url: 'launch',
      title: 'Запуск',
      text: '<p>x</p>',
      short_text: 'short',
      seo_title: 't',
      seo_description: 'd',
      seo_keywords: 'k',
    })
  })
})
