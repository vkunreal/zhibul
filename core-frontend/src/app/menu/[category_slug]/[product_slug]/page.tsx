import { notFound } from 'next/navigation'

import { useCategories } from '@/entities/categories'
import { productsApi, useProduct } from '@/entities/product'
import { ProductFiles } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs, Icon, Wrapper } from '@/shared/ui'
import { ProductDetails, ProductImages } from '@/widgets/product'

import styles from './styles.module.scss'

export async function generateStaticParams() {
  const products = await productsApi.getAllProducts()

  if (!products.length) {
    return []
  }

  return products.map(({ category_url, url }) => ({
    category_slug: category_url,
    product_slug: url,
  }))
}

type Params = Promise<{ category_slug: string; product_slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { product_slug } = await params
  const product = await productsApi.getProduct(product_slug)

  if (!product) {
    notFound()
  }

  const { seo_title, seo_description, seo_keywords, name } = product

  return {
    title: seo_title || name || 'Товар',
    description: seo_description || '',
    keywords: seo_keywords || '',
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { category_slug, product_slug } = await params

  const { categories, category } = await useCategories(category_slug)
  const { product, options } = await useProduct(product_slug)

  if (!category || !product) {
    notFound()
  }

  const {
    name,
    description,
    code,
    brand,
    manufacturer,
    display_price,
    images,
    files,
  } = product

  const categoryBreadcrubms = buildBreadcrumbs({ categories, category })

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/katalog', title: 'Каталог' },
          ...categoryBreadcrubms,
        ]}
        activeTitle={name}
        itemCode={code}
      />

      <Wrapper className={styles.container}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: name.toUpperCase() }}
        />

        <div className={styles.top}>
          <ProductImages images={images} alt={name} />

          <ProductDetails
            options={options}
            brand={brand}
            manufacturer={manufacturer}
            displayPrice={display_price}
          />
        </div>

        <ProductFiles files={files} />

        {description && (
          <div>
            <h2>Описание товара:</h2>

            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </Wrapper>
    </>
  )
}
