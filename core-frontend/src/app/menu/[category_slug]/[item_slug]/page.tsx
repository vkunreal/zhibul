import { notFound } from 'next/navigation'

import { useCategories } from '@/entities/categories'
import { itemsApi, useItem } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs, Wrapper } from '@/shared/ui'

export async function generateStaticParams() {
  const items = await itemsApi.getAllItems()

  if (!items.length) {
    return []
  }

  return items.map((item) => ({
    category_slug: item.category_url,
    item_slug: item.url,
  }))
}

type Params = Promise<{ category_slug: string; item_slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { item_slug } = await params
  const item = await itemsApi.getItem(item_slug)

  if (!item) {
    notFound()
  }

  return {
    title: item.seo_title || item.name || 'Товар',
    description: item.seo_description || '',
    keywords: item.seo_keywords || '',
  }
}

const ItemOption = ({ name, value }: { name: string; value: string }) => (
  <div>
    <span>{name}</span>
    <div className="" />
    <span>{value}</span>
  </div>
)

export default async function CategoryPage({ params }: { params: Params }) {
  const { category_slug, item_slug } = await params

  const { categories, category } = await useCategories(category_slug)
  const { item, options } = await useItem(item_slug)

  if (!category || !item) {
    notFound()
  }

  const categoryBreadcrubms = buildBreadcrumbs({ categories, category })

  const visibleOptions = options
    .filter((op) => !op?.is_dropdown && op?.show_item)
    .sort((a, b) => (a.position < b.position ? -1 : 1))

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/katalog', title: 'Каталог' },
          ...categoryBreadcrubms,
        ]}
        activeTitle={item.name}
        itemCode={item.code}
      />

      <Wrapper>
        <h1 dangerouslySetInnerHTML={{ __html: item.name }} />

        <div>
          <div></div>
          <div>
            <h2>Характеристики товара:</h2>

            <ItemOption name="Бренд" value={item.brand} />

            <ItemOption name="Страна производитель" value={item.manufacturer} />

            {visibleOptions.map(({ id, name, value }) => (
              <ItemOption key={id} name={name} value={value} />
            ))}
          </div>
        </div>
      </Wrapper>
    </>
  )
}
