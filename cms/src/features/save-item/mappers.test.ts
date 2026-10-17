import { describe, expect, it } from 'vitest'

import { Country } from '@entities/countries/model'
import { Item } from '@entities/items/model'

import { emptyItemForm } from './constants'
import { ItemFormValues } from './interfaces'
import { toAddItemDTO, toChangeItemDTO } from './mappers'

const countries: Country[] = [
  { id: 11, name: 'Китай' },
  { id: 22, name: 'Германия' },
]

const values = (overrides: Partial<ItemFormValues> = {}): ItemFormValues => ({
  ...emptyItemForm,
  categoryId: 5,
  position: 3,
  url: 'drill',
  name: 'Дрель',
  description: '<p>desc</p>',
  brand: 'Bosch',
  manufacturer: 'Германия',
  price: '250',
  valute: '2',
  purchase: '100',
  profitability: '15',
  postfix: 'шт',
  seoTitle: 'seo',
  seoDescription: 'seo d',
  seoKeywords: 'seo k',
  isActive: true,
  isOrderOnly: false,
  ...overrides,
})

describe('save-item mappers', () => {
  it('toAddItemDTO собирает DTO и резолвит manufacturer по имени страны', () => {
    expect(toAddItemDTO(values(), countries)).toEqual({
      category_id: 5,
      position: 3,
      url: 'drill',
      name: 'Дрель',
      description: '<p>desc</p>',
      brand: 'Bosch',
      manufacturer: 22,
      price: '250',
      valute_id: 2,
      purchase_price: 100,
      profitabilaty: 15,
      price_postfix: 'шт',
      seo_title: 'seo',
      seo_description: 'seo d',
      seo_keywords: 'seo k',
      is_active: true,
      is_order_only: false,
    })
  })

  it('для неизвестной страны ставит manufacturer=0 и null для пустых чисел', () => {
    expect(
      toAddItemDTO(
        values({ manufacturer: 'Нет такой', purchase: '', profitability: '  ' }),
        countries,
      ),
    ).toMatchObject({
      manufacturer: 0,
      purchase_price: null,
      profitabilaty: null,
    })
  })

  it('toChangeItemDTO добавляет item_id', () => {
    const item = { id: 99 } as Item
    expect(
      toChangeItemDTO(countries, { values: values(), item }),
    ).toMatchObject({
      item_id: 99,
      name: 'Дрель',
      manufacturer: 22,
    })
  })
})
