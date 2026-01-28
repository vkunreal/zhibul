import { categoriesApi } from './categoriesApi'

export const useCategories = async (slug?: string) => {
  const categories = (await categoriesApi.getCategories()) ?? []

  let category = null

  if (slug && categories?.length) {
    category =
      categories.find(({ url, active }) => url === slug && !!active) ?? null
  }

  return { categories, category }
}
