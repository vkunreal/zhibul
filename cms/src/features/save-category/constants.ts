import { CategorySortMode } from '@entities/items/model'

import { CategoryFormValues } from './interfaces'

export const emptyCategoryForm: CategoryFormValues = {
  name: '',
  url: '',
  position: 0,
  description: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  sortMode: CategorySortMode.Manual,
}
