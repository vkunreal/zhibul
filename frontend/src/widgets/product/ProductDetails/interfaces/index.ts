import { ProductOption } from '@/entities/product'

export interface ProductDetailsProps {
  options: ProductOption[]
  brand: string
  manufacturer: string
  displayPrice: string
}
