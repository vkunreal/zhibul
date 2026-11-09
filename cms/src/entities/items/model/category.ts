/** Как сортировать товары категории на фронте. */
export enum CategorySortMode {
  Manual = 'manual',
  Alphabet = 'alphabet',
  Random = 'random',
  PriceAsc = 'price_asc',
  PriceDesc = 'price_desc',
  Newest = 'newest',
}

export interface Category {
  id: number
  /** `null` у корневых категорий. */
  parentId: number | null
  position: number
  name: string
  url: string
  description: string
  image: string
  /** Внутри подкатегории, а не товары. */
  hasSubcategories: boolean
  /** Видна на сайте. */
  isActive: boolean
  sortMode: CategorySortMode
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  itemsCount: number
}

/** Категория в списках выбора: фильтр таблицы и привязка товара. */
export type CategoryOption = Pick<Category, 'id' | 'name' | 'url'>
