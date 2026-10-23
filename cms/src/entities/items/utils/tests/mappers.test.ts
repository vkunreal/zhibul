import { describe, expect, it } from 'vitest'

import type {
  CategoryWithItemsCountDTO,
  ItemDTO,
  ItemFileDTO,
  ItemImageDTO,
} from '@shared/api'

import { CategorySortMode } from '../../model'
import { toCategory, toItem, toItemFile, toItemImage } from '../mappers'

const itemDto = (overrides: Partial<ItemDTO> = {}): ItemDTO => ({
  id: 10,
  code: 'A-1',
  position: 2,
  category_id: 3,
  category_url: 'tools',
  category_name: 'Инструменты',
  url: 'hammer',
  name: 'Молоток',
  description: '<p>Текст</p>',
  brand: 'ACME',
  manufacturer: 'Китай',
  price: '100',
  valute_id: 1,
  purchase_price: 50,
  profitabilaty: 20,
  price_postfix: 'шт',
  display_price: '100 BYN',
  seo_title: 'title',
  seo_description: 'desc',
  seo_keywords: 'keys',
  is_active: 1,
  is_order_only: 0,
  ...overrides,
})

describe('toItem', () => {
  it('мапит DTO товара в доменную модель', () => {
    expect(toItem(itemDto())).toEqual({
      id: 10,
      code: 'A-1',
      position: 2,
      categoryId: 3,
      categoryUrl: 'tools',
      categoryName: 'Инструменты',
      url: 'hammer',
      name: 'Молоток',
      description: '<p>Текст</p>',
      brand: 'ACME',
      manufacturer: 'Китай',
      price: '100',
      valuteId: 1,
      purchasePrice: 50,
      profitability: 20,
      pricePostfix: 'шт',
      displayPrice: '100 BYN',
      seoTitle: 'title',
      seoDescription: 'desc',
      seoKeywords: 'keys',
      isActive: true,
      isOrderOnly: false,
    })
  })

  it('подставляет значения по умолчанию для nullable-полей', () => {
    expect(
      toItem(
        itemDto({
          code: null,
          position: null,
          description: null,
          brand: null,
          manufacturer: null,
          price: null,
          price_postfix: null,
          display_price: undefined,
          seo_title: null,
          seo_description: null,
          seo_keywords: null,
          is_active: 0,
          is_order_only: 1,
        }),
      ),
    ).toMatchObject({
      code: '',
      position: 0,
      description: '',
      brand: '',
      manufacturer: '',
      price: '',
      pricePostfix: '',
      displayPrice: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      isActive: false,
      isOrderOnly: true,
    })
  })
})

describe('toCategory', () => {
  it('мапит категорию и режим сортировки', () => {
    const dto: CategoryWithItemsCountDTO = {
      id: 1,
      parent_id: null,
      position: null,
      name: 'Корень',
      url: 'root',
      description: null,
      image: null,
      is_contains: 1,
      active: 1,
      sort_mode: 'price_asc',
      seo_title: null,
      seo_description: null,
      seo_keywords: null,
      items_count: 5,
    }

    expect(toCategory(dto)).toEqual({
      id: 1,
      parentId: null,
      position: 0,
      name: 'Корень',
      url: 'root',
      description: '',
      image: '',
      hasSubcategories: true,
      isActive: true,
      sortMode: CategorySortMode.PriceAsc,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      itemsCount: 5,
    })
  })
})

describe('toItemImage / toItemFile', () => {
  it('мапит изображение и файл', () => {
    const image: ItemImageDTO = { item_id: 7, src: '/img.png', is_main: 1 }
    const file: ItemFileDTO = {
      item_id: 7,
      src: '/doc.pdf',
      title: 'Паспорт',
      icon: 'pdf',
    }

    expect(toItemImage(image)).toEqual({
      itemId: 7,
      src: '/img.png',
      isMain: true,
    })
    expect(toItemFile(file)).toEqual({
      itemId: 7,
      src: '/doc.pdf',
      title: 'Паспорт',
      icon: 'pdf',
    })
  })
})
