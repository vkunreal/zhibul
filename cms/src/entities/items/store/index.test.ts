import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import type { ItemDTO, ItemsPageDTO } from '@shared/api'

import {
  $configureItem,
  $itemPages,
  $items,
  $pageLimit,
  configureItemRequested,
  getItemByIdFx,
  getItemsFx,
  itemsRequested,
  pageLimitChanged,
} from './index'

const itemDto = (id: number): ItemDTO => ({
  id,
  code: `C-${id}`,
  position: 0,
  category_id: 1,
  category_url: 'cat',
  category_name: 'Cat',
  url: `item-${id}`,
  name: `Item ${id}`,
  description: '',
  brand: '',
  manufacturer: '',
  price: '10',
  valute_id: 1,
  purchase_price: null,
  profitabilaty: null,
  price_postfix: '',
  display_price: '10',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  is_active: 1,
  is_order_only: 0,
})

const page = (data: ItemDTO[], count: number): ItemsPageDTO => ({
  data,
  count,
  prev: null,
  next: null,
})

describe('items store', () => {
  it('загружает список товаров и считает число страниц', async () => {
    const scope = fork({
      handlers: [
        [
          getItemsFx,
          async () => page([itemDto(1), itemDto(2)], 25),
        ],
      ],
    })

    await allSettled(itemsRequested, {
      scope,
      params: { page: 1, categoryUrl: '', search: '' },
    })

    expect(scope.getState($items)).toHaveLength(2)
    expect(scope.getState($items)[0]?.name).toBe('Item 1')
    expect(scope.getState($itemPages)).toBe(2)
  })

  it('меняет pageLimit', async () => {
    const scope = fork()
    await allSettled(pageLimitChanged, { scope, params: 50 })
    expect(scope.getState($pageLimit)).toBe(50)
  })

  it('configureItemRequested загружает товар и сбрасывает стор перед запросом', async () => {
    const scope = fork({
      values: [[$configureItem, { id: 1, name: 'old' } as never]],
      handlers: [[getItemByIdFx, async (id: number) => ({ id, name: `Item ${id}` }) as never]],
    })

    const pending = allSettled(configureItemRequested, { scope, params: 7 })
    expect(scope.getState($configureItem)).toBeNull()
    await pending

    expect(scope.getState($configureItem)).toMatchObject({ id: 7, name: 'Item 7' })
  })

  it('при ошибке getItemByIdFx очищает configureItem', async () => {
    const scope = fork({
      handlers: [
        [
          getItemByIdFx,
          async () => {
            throw new Error('not found')
          },
        ],
      ],
    })

    await allSettled(configureItemRequested, { scope, params: 404 })
    expect(scope.getState($configureItem)).toBeNull()
  })
})
