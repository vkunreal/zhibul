import { ProductOption } from '../model'

import { productsApi } from './productsApi'

export const useProduct = async (slug: string) => {
  const product = await productsApi.getProduct(slug)
  let options: ProductOption[] = []

  if (product?.id) {
    options = await productsApi.getProductOptions(product.id)
  }

  return { product, options }
}
