import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import type { NewsDTO } from '@shared/api'

import {
  $news,
  $newsItem,
  $newsMedia,
  changeNewsFx,
  changeNewsSubmitted,
  getNewsFx,
  getNewsItemFx,
  getNewsMediaFx,
  newsRequested,
  uploadNewsMediaFx,
} from './index'

const newsDto = (id: number, mediaSrc = '/a.jpg'): NewsDTO => ({
  id,
  url: `news-${id}`,
  title: `News ${id}`,
  text: 'text',
  short_text: 'short',
  date: '1700000000000',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  media: [{ news_id: id, src: mediaSrc, position: 0 }],
})

describe('news store', () => {
  it('newsRequested загружает список новостей', async () => {
    const scope = fork({
      handlers: [[getNewsFx, async () => [newsDto(1), newsDto(2)]]],
    })

    await allSettled(newsRequested, { scope })

    expect(scope.getState($news)).toHaveLength(2)
    expect(scope.getState($news)[0]?.title).toBe('News 1')
  })

  it('getNewsItemFx заполняет новость и медиа', async () => {
    const scope = fork({
      handlers: [[getNewsItemFx, async () => newsDto(5, '/cover.jpg')]],
    })

    await allSettled(getNewsItemFx, { scope, params: 5 })

    expect(scope.getState($newsItem)?.id).toBe(5)
    expect(scope.getState($newsMedia)).toEqual([
      { newsId: 5, src: '/cover.jpg', position: 0 },
    ])
  })

  it('changeNewsSubmitted мапит форму и вызывает changeNewsFx', async () => {
    let body: unknown
    const scope = fork({
      values: [[$newsItem, { id: 8, url: 'x', title: 't' } as never]],
      handlers: [
        [
          changeNewsFx,
          async (payload) => {
            body = payload
          },
        ],
        [getNewsItemFx, async () => newsDto(8)],
      ],
    })

    await allSettled(changeNewsSubmitted, {
      scope,
      params: {
        url: 'x',
        title: 'New title',
        text: '<p>t</p>',
        shortText: 's',
        seoTitle: 'st',
        seoDescription: 'sd',
        seoKeywords: 'sk',
      },
    })

    expect(body).toEqual({
      url: 'x',
      title: 'New title',
      text: '<p>t</p>',
      short_text: 's',
      seo_title: 'st',
      seo_description: 'sd',
      seo_keywords: 'sk',
    })
    expect(scope.getState($newsItem)?.id).toBe(8)
  })

  it('после uploadNewsMediaFx перезагружает медиа', async () => {
    const scope = fork({
      handlers: [
        [uploadNewsMediaFx, async () => undefined],
        [
          getNewsMediaFx,
          async () => [{ news_id: 3, src: '/new.jpg', position: 1 }],
        ],
      ],
    })

    await allSettled(uploadNewsMediaFx, {
      scope,
      params: { newsId: 3, formData: new FormData() },
    })

    expect(scope.getState($newsMedia)).toEqual([
      { newsId: 3, src: '/new.jpg', position: 1 },
    ])
  })
})
