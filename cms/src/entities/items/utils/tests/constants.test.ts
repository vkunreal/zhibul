import { describe, expect, it } from 'vitest'

import { CategorySortMode } from '../../model'
import {
  categorySortModeLabels,
  categorySortModes,
  DEFAULT_ITEMS_PAGE_LIMIT,
  ITEMS_PAGE_LIMIT_OPTIONS,
} from '../constants'

describe('items constants', () => {
  it('держит опции лимита страницы и дефолт', () => {
    expect(ITEMS_PAGE_LIMIT_OPTIONS).toContain(DEFAULT_ITEMS_PAGE_LIMIT)
    expect(DEFAULT_ITEMS_PAGE_LIMIT).toBe(20)
  })

  it('мапит API sort_mode в enum', () => {
    expect(categorySortModes.manual).toBe(CategorySortMode.Manual)
    expect(categorySortModes.price_desc).toBe(CategorySortMode.PriceDesc)
    expect(categorySortModeLabels[CategorySortMode.Alphabet]).toContain(
      'алфавиту',
    )
  })
})
