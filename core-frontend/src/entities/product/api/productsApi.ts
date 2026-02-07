import { apiGet } from '@/shared/api'

import { Product, ProductOption } from '..'

export const productsApi = {
  endpoints: {
    products: '/api/items/',
    categoryItems: (slug: string) => `/api/items/${slug}`,
    product: (slug: string) => `/api/item/${slug}`,
    productOptions: (id: number) => `/api/options/${id}`,
  },

  async getAllProducts() {
    const products = await apiGet<Product[]>(this.endpoints.products)

    return products || []
  },

  async getCategoryItems(slug: string) {
    const products = await apiGet<Product[]>(this.endpoints.categoryItems(slug))

    return products || []
  },

  async getProduct(slug: string) {
    const product = await apiGet<Product>(this.endpoints.product(slug))

    return product || null
  },

  async getProductOptions(id: number) {
    const options = await apiGet<ProductOption[]>(
      this.endpoints.productOptions(id),
    )

    return options || []
  },
}
