import { notFound } from 'next/navigation'

import { useCategories } from '@/entities/categories'
import { itemsApi, useItem } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs, Wrapper } from '@/shared/ui'
import { ItemDetails, ItemImages } from '@/widgets/item'

import styles from './styles.module.scss'

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

export default async function ItemPage({ params }: { params: Params }) {
  const { category_slug, item_slug } = await params

  const { categories, category } = await useCategories(category_slug)
  const { item, options } = await useItem(item_slug)

  if (!category || !item) {
    notFound()
  }

  const categoryBreadcrubms = buildBreadcrumbs({ categories, category })

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

        <div className={styles.top}>
          <ItemImages images={item.images} alt={item.name} />

          <ItemDetails
            options={options}
            brand={item.brand}
            manufacturer={item.manufacturer}
          />
        </div>
      </Wrapper>
    </>
  )
}
