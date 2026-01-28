import { categoriesApi, useCategories } from '@/entities/categories'
import { itemsApi } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs } from '@/shared/ui'
import { CategoryList, ItemList } from '@/widgets'

export async function generateStaticParams() {
  const categories = await categoriesApi.getCategories()

  if (!categories || !categories.length) {
    return []
  }

  // Возвращаем только активные категории для статической генерации
  return categories
    .filter((category) => category.active)
    .map((category) => ({
      category_slug: category.url,
    }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category_slug: string }>
}) {
  const { category_slug } = await params
  const { category } = await useCategories(category_slug)

  return {
    title: category?.seo_title || category?.name || 'Каталог',
    description: category?.seo_description || '',
    keywords: category?.seo_keywords || '',
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category_slug: string }>
  searchParams: {
    view?: 'grid' | 'list'
  }
}) {
  const { category_slug } = await params
  const { view = 'grid' } = await searchParams
  const { categories, category } = await useCategories(category_slug)
  const categoryItems = await itemsApi.getCategoryItems(category_slug)

  if (!categories || !category) {
    return null
  }

  const undercategories =
    categories
      .filter(({ parent_id, active }) => parent_id === category.id && !!active)
      .sort((a, b) => (a.position < b.position ? -1 : 1)) || []

  const categoryBreadcrubms = buildBreadcrumbs({ categories, category })

  let page = 'items'

  if (!categoryItems.length && undercategories.length) {
    page = 'categories'
  }

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/katalog', title: 'Каталог' },
          ...categoryBreadcrubms,
        ]}
        activeTitle={category.name}
      />

      {page === 'items' ? (
        <ItemList items={categoryItems} currentView={view} />
      ) : (
        <CategoryList categories={undercategories} />
      )}
    </>
  )
}
