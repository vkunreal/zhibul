import { notFound } from 'next/navigation'

import { useCategories } from '@/entities/categories'
import {
  ProductDescription,
  productsApi,
  ProductTitle,
  useProduct,
} from '@/entities/product'
import { ProductFiles } from '@/entities/product'
import { Breadcrumbs, buildBreadcrumbs, Gallery, Wrapper } from '@/shared/ui'
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

  const {
    name = 'Товар',
    seo_title = '',
    seo_description = '',
    seo_keywords = '',
  } = product

  return {
    title: seo_title || name,
    description: seo_description,
    keywords: seo_keywords,
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
        <ProductTitle>{name}</ProductTitle>

        <section className={styles.top}>
          {/* <ProductImages images={images} alt={name} /> */}
          <Gallery images={images} alt={name} />

          <ProductDetails
            options={options}
            brand={brand}
            manufacturer={manufacturer}
            displayPrice={display_price}
          />
        </section>

        <ProductFiles files={files} />

        <ProductDescription>{description}</ProductDescription>
      </Wrapper>
    </>
  )
}
