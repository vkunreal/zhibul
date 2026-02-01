import { notFound } from 'next/navigation'

import { categoriesApi, useCategories } from '@/entities/categories'
import { itemsApi } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs } from '@/shared/ui'
import { CategoryList } from '@/widgets/category'
import { ItemList } from '@/widgets/item'

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

  if (!category || !category.active) {
    notFound()
  }

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
  searchParams: Promise<{ view?: 'grid' | 'list' }>
}) {
  const { category_slug } = await params
  const { view = 'grid' } = (await searchParams) ?? {}
  const { categories, category } = await useCategories(category_slug)
  const categoryItems = await itemsApi.getCategoryItems(category_slug)

  if (!categories || !category || !category.active) {
    notFound()
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
          ...categoryBreadcrubms.slice(0, -1),
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
