import { getCategories } from './getCategories'

export const useCategories = async (slug?: string) => {
  const categories = await getCategories()

  const category =
    slug && categories?.length
      ? categories.find(({ url, active }) => url === slug && !!active)
      : null

  return { categories, category }
}
