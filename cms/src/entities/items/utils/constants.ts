import type { CategorySortModeDTO } from '@shared/api'

import { CategorySortMode } from '../model'

export const ITEMS_PAGE_LIMIT_OPTIONS = [10, 20, 50, 100] as const
export const DEFAULT_ITEMS_PAGE_LIMIT = 20

export const categorySortModes: Record<CategorySortModeDTO, CategorySortMode> =
  {
    manual: CategorySortMode.Manual,
    alphabet: CategorySortMode.Alphabet,
    random: CategorySortMode.Random,
    price_asc: CategorySortMode.PriceAsc,
    price_desc: CategorySortMode.PriceDesc,
    newest: CategorySortMode.Newest,
  }

/** Подписи режимов сортировки товаров в категории. */
export const categorySortModeOptions: {
  value: CategorySortMode
  label: string
}[] = [
  { value: CategorySortMode.Manual, label: 'Вручную (по позиции)' },
  { value: CategorySortMode.Alphabet, label: 'По алфавиту' },
  { value: CategorySortMode.Random, label: 'Случайно' },
  { value: CategorySortMode.PriceAsc, label: 'Цена: по возрастанию' },
  { value: CategorySortMode.PriceDesc, label: 'Цена: по убыванию' },
  { value: CategorySortMode.Newest, label: 'Сначала новые' },
]

export const categorySortModeLabels = Object.fromEntries(
  categorySortModeOptions.map(({ value, label }) => [value, label]),
) as Record<CategorySortMode, string>
