import { describe, expect, it } from 'vitest'

import { toPage, toSavePageDTO } from '../mappers'

describe('pages mappers', () => {
  it('toPage подставляет пустые строки для null', () => {
    expect(
      toPage({
        url: 'about',
        name: 'О нас',
        text: null,
        seo_title: null,
        seo_description: null,
        seo_keywords: null,
      }),
    ).toEqual({
      url: 'about',
      name: 'О нас',
      text: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    })
  })

  it('toSavePageDTO сериализует страницу обратно в DTO', () => {
    expect(
      toSavePageDTO({
        url: 'about',
        name: 'О нас',
        text: '<p>Текст</p>',
        seoTitle: 't',
        seoDescription: 'd',
        seoKeywords: 'k',
      }),
    ).toEqual({
      url: 'about',
      name: 'О нас',
      text: '<p>Текст</p>',
      seo_title: 't',
      seo_description: 'd',
      seo_keywords: 'k',
    })
  })
})
