import type { MetadataRoute } from 'next'

import { Product } from '@/entities/product'
import { TrailerRent } from '@/entities/trailer'

import { httpClient } from '@/shared/api'
import { Category } from '@/shared/model'

const staticUrls = [
  'uslugi',
  'arenda_prizepa',
  'contacts',
  'dostavka',
  'katalog',
  'news',
  'rembaza',
  'uslugi',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zhbl.by'

  let urls: MetadataRoute.Sitemap = [
    ...staticUrls.map((url) => ({ url: `${baseUrl}/${url}` })),
  ]

  // const [categories, items, trailers] = await Promise.all([
  //   httpClient.get<Category[]>({ url: 'https://api.zhbl.by/api/categories' }),
  //   httpClient.get<Product[]>({ url: 'https://api.zhbl.by/api/items' }),
  //   httpClient.get<TrailerRent[]>({
  //     url: 'https://api.zhbl.by/api/trailers-rent',
  //   }),
  // ])
  const { data: categories } = await httpClient.get<Category[]>({
    url: 'https://api.zhbl.by/api/categories',
  })
  const { data: items } = await httpClient.get<Product[]>({
    url: 'https://api.zhbl.by/api/items',
  })
  const { data: trailers } = await httpClient.get<TrailerRent[]>({
    url: 'https://api.zhbl.by/api/trailers-rent',
  })

  // categories urls
  if (categories?.length) {
    urls = [
      ...urls,
      ...categories.map(({ url }) => ({
        url: `${baseUrl}/menu/${url}`,
      })),
    ]
  }

  // items urls
  if (items?.length) {
    urls = [
      ...urls,
      ...items.map(({ category_url, url }) => ({
        url: `${baseUrl}/menu/${category_url}/${url}`,
      })),
    ]
  }

  // prizepi urls
  if (trailers?.length) {
    urls = [
      ...urls,
      ...trailers.map(({ url }) => ({
        url: `${baseUrl}/arenda_prizepa/${url}`,
      })),
    ]
  }

  return urls
}
