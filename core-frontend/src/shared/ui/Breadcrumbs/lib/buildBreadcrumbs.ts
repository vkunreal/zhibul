import { Category } from '@/entities/categories'

export const buildBreadcrumbs = ({
  categories,
  category,
}: {
  categories: Category[]
  category: Category
}) => {
  let tempCategory = category
  const result = [tempCategory]

  while (tempCategory.parent_id) {
    const foundCategory = categories.find(
      (c) => c.id === tempCategory.parent_id,
    )
    if (foundCategory) {
      tempCategory = foundCategory
      result.push(tempCategory)
    }
  }

  return result
    .reverse()
    .slice(0, -1)
    .map(({ url, name }) => ({ url: `/menu/${url}`, title: name }))
}
