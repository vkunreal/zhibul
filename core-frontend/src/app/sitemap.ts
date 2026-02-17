import type { MetadataRoute } from 'next'

import { Product } from '@/entities/product'
import { TrailerRent } from '@/entities/trailer'
import { Category } from '@/shared/model'

const apiGet = async <T>(url: string) => {
  const response = await fetch(url).then((data) => data.json())

  return response as T
}

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

  const [categories, items, trailers] = await Promise.all([
    apiGet<Category[]>('https://api.zhbl.by/api/categories'),
    apiGet<Product[]>('https://api.zhbl.by/api/items'),
    apiGet<TrailerRent[]>('https://api.zhbl.by/api/trailers-rent'),
  ])

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
