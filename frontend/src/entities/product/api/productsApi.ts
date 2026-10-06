import { httpClient } from '@/shared/api'

import { Product, ProductOption } from '..'

export const productsApi = {
  endpoints: {
    products: '/api/items/',
    categoryItems: (slug: string) => `/api/items/${slug}`,
    product: (slug: string) => `/api/item/${slug}`,
    productOptions: (id: number) => `/api/options/${id}`,
  },

  async getAllProducts() {
    const { data } = await httpClient.get<Product[]>({
      url: this.endpoints.products,
    })

    return data || []
  },

  async getCategoryItems(slug: string) {
    const { data } = await httpClient.get<Product[]>({
      url: this.endpoints.categoryItems(slug),
    })

    return data || []
  },

  async getProduct(slug: string) {
    const { data } = await httpClient.get<Product>({
      url: this.endpoints.product(slug),
    })

    return data || null
  },

  async getProductOptions(id: number) {
    const { data } = await httpClient.get<ProductOption[]>({
      url: this.endpoints.productOptions(id),
    })

    return data || []
  },
}
