import { notFound } from 'next/navigation'

import {
  categoriesApi,
  getUnderCategories,
  useCategories,
} from '@/entities/category'
import { productsApi } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs } from '@/shared/ui'
import { CategoryList } from '@/widgets/category'
import { ProductList } from '@/widgets/product'

export async function generateStaticParams() {
  const categories = await categoriesApi.getCategories()

  if (!categories || !categories.length) {
    return []
  }

  // Возвращаем только активные категории для статической генерации
  return categories
    .filter(({ active }) => active)
    .map(({ url }) => ({
      category_slug: url,
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

  const {
    name = 'Каталог',
    seo_title: title = '',
    seo_description: description = '',
    seo_keywords: keywords = '',
  } = category

  return { title: title || name, description, keywords }
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
  const categoryItems = await productsApi.getCategoryItems(category_slug)

  if (!categories || !category || !category.active) {
    notFound()
  }

  const undercategories = getUnderCategories({ categories, category })

  const breadcrumbs = buildBreadcrumbs({ categories, category })

  let page = 'products'

  if (!categoryItems.length && undercategories.length) {
    page = 'categories'
  }

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/katalog', title: 'Каталог' },
          ...breadcrumbs.slice(0, -1),
        ]}
        activeTitle={category.name}
      />

      {page === 'products' ? (
        <ProductList products={categoryItems} currentView={view} />
      ) : (
        <CategoryList categories={undercategories} />
      )}
    </>
  )
}
