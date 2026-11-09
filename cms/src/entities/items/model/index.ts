export * from './category'

export interface Item {
  id: number
  code: string
  position: number
  categoryId: number
  categoryUrl: string
  categoryName: string
  url: string
  name: string
  description: string
  brand: string
  /** Название страны-производителя. */
  manufacturer: string
  price: string
  valuteId: number
  purchasePrice: number | null
  profitability: number | null
  pricePostfix: string
  /** Цена как на витрине: готовая строка или «По заказу». */
  displayPrice: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  isActive: boolean
  isOrderOnly: boolean
}

export interface ItemImage {
  itemId: number
  src: string
  isMain: boolean
}

export interface ItemFile {
  itemId: number
  src: string
  title: string
  icon: string
}
