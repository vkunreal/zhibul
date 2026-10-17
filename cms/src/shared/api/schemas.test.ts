import { describe, expect, it } from 'vitest'

import { loginResponseSchema } from './auth/schemas'
import { categoriesWithItemsCountSchema } from './categories/schemas'
import { itemSchema, itemsPageSchema } from './items/schemas'
import { newsSchema } from './news/schemas'
import { optionSchema } from './options/schemas'
import { pageSchema } from './pages/schemas'
import { statusResponseSchema } from './schemas'
import { valuteSchema } from './valutes/schemas'

describe('API schemas', () => {
  it('принимает валидный login response', () => {
    expect(loginResponseSchema.parse({ token: 'abc' })).toEqual({ token: 'abc' })
  })

  it('отклоняет login без token', () => {
    expect(() => loginResponseSchema.parse({})).toThrow()
  })

  it('парсит товар и страницу списка', () => {
    const item = {
      id: 1,
      code: 'C',
      position: 0,
      category_id: 2,
      category_url: 'cat',
      category_name: 'Cat',
      url: 'item',
      name: 'Item',
      description: null,
      brand: null,
      manufacturer: null,
      price: null,
      valute_id: 1,
      purchase_price: null,
      profitabilaty: null,
      price_postfix: null,
      seo_title: null,
      seo_description: null,
      seo_keywords: null,
      is_active: 1,
      is_order_only: 0,
    }

    expect(itemSchema.parse(item).display_price).toBe('')
    expect(
      itemsPageSchema.parse({
        data: [item],
        count: 1,
        prev: null,
        next: null,
      }).count,
    ).toBe(1)
  })

  it('парсит новость со списком медиа', () => {
    expect(
      newsSchema.parse({
        id: 1,
        url: 'n',
        title: 'T',
        text: 'full',
        short_text: 'short',
        date: '1',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        media: [{ news_id: 1, src: '/a.jpg', position: 0 }],
      }).media,
    ).toHaveLength(1)
  })

  it('парсит страницу, опцию, валюту и статус', () => {
    expect(
      pageSchema.parse({
        url: 'about',
        name: 'About',
        text: null,
        seo_title: null,
        seo_description: null,
        seo_keywords: null,
      }).url,
    ).toBe('about')

    expect(
      optionSchema.parse({
        id: 1,
        item_id: 2,
        position: 0,
        name: 'N',
        value: 'V',
        show_item: 1,
        show_menu: 0,
        is_dropdown: null,
      }).name,
    ).toBe('N')

    expect(valuteSchema.parse({ id: 1, title: 'BYN', value: 1 }).value).toBe(1)
    expect(statusResponseSchema.parse({ status: true })).toEqual({
      status: true,
    })
  })

  it('парсит категории с items_count и sort_mode', () => {
    const [category] = categoriesWithItemsCountSchema.parse([
      {
        id: 1,
        parent_id: null,
        position: 0,
        name: 'Root',
        url: 'root',
        description: null,
        image: null,
        is_contains: 0,
        active: 1,
        sort_mode: 'alphabet',
        seo_title: null,
        seo_description: null,
        seo_keywords: null,
        items_count: 3,
      },
    ])

    expect(category?.sort_mode).toBe('alphabet')
    expect(category?.items_count).toBe(3)
  })

  it('отклоняет неизвестный sort_mode', () => {
    expect(() =>
      categoriesWithItemsCountSchema.parse([
        {
          id: 1,
          parent_id: null,
          position: 0,
          name: 'Root',
          url: 'root',
          description: null,
          image: null,
          is_contains: 0,
          active: 1,
          sort_mode: 'unknown',
          seo_title: null,
          seo_description: null,
          seo_keywords: null,
          items_count: 0,
        },
      ]),
    ).toThrow()
  })
})
