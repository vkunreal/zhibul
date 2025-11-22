import { getCategoryItems, useCategories } from '@/shared/api'
import { Breadcrumbs, buildBreadcrumbs } from '@/shared/ui'
import { CategoryList, ItemList } from '@/widgets'

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
  const categoryItems = await getCategoryItems(category_slug)

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
