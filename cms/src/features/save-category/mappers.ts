import { Category } from '@entities/items/model'

import { emptyCategoryForm } from './constants'
import { CategoryFormValues } from './interfaces'

export const toCategoryForm = (
  category: Category | null,
): CategoryFormValues => {
  if (!category) return emptyCategoryForm

  return {
    name: category.name,
    url: category.url,
    position: category.position,
    description: category.description,
    seoTitle: category.seoTitle,
    seoDescription: category.seoDescription,
    seoKeywords: category.seoKeywords,
    sortMode: category.sortMode,
  }
}
