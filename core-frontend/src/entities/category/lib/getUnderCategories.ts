import type { Category } from '../model'

export const getUnderCategories = ({
  categories,
  category,
}: {
  categories: Category[]
  category: Category
}) =>
  categories
    .filter(({ parent_id, active }) => parent_id === category.id && !!active)
    .sort((a, b) => (a.position < b.position ? -1 : 1)) || []
