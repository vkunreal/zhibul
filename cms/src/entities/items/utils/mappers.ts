import type {
  CategoryWithItemsCountDTO,
  ItemDTO,
  ItemFileDTO,
  ItemImageDTO,
} from '@shared/api'
import { toBool } from '@shared/utils'

import { Category, Item, ItemFile, ItemImage } from '../model'

import { categorySortModes } from './constants'

export const toCategory = (dto: CategoryWithItemsCountDTO): Category => ({
  id: dto.id,
  parentId: dto.parent_id,
  position: dto.position ?? 0,
  name: dto.name,
  url: dto.url,
  description: dto.description ?? '',
  image: dto.image ?? '',
  hasSubcategories: toBool(dto.is_contains),
  isActive: toBool(dto.active, true),
  sortMode: categorySortModes[dto.sort_mode],
  seoTitle: dto.seo_title ?? '',
  seoDescription: dto.seo_description ?? '',
  seoKeywords: dto.seo_keywords ?? '',
  itemsCount: dto.items_count,
})

export const toItem = (dto: ItemDTO): Item => ({
  id: dto.id,
  code: dto.code,
  position: dto.position ?? 0,
  categoryId: dto.category_id,
  categoryUrl: dto.category_url,
  categoryName: dto.category_name,
  url: dto.url,
  name: dto.name,
  description: dto.description ?? '',
  brand: dto.brand ?? '',
  manufacturer: dto.manufacturer ?? '',
  price: dto.price ?? '',
  valuteId: dto.valute_id,
  purchasePrice: dto.purchase_price,
  profitability: dto.profitabilaty,
  pricePostfix: dto.price_postfix ?? '',
  displayPrice: dto.display_price ?? '',
  seoTitle: dto.seo_title ?? '',
  seoDescription: dto.seo_description ?? '',
  seoKeywords: dto.seo_keywords ?? '',
  isActive: toBool(dto.is_active, true),
  isOrderOnly: toBool(dto.is_order_only),
})

export const toItemImage = (dto: ItemImageDTO): ItemImage => ({
  itemId: dto.item_id,
  src: dto.src,
  isMain: toBool(dto.is_main),
})

export const toItemFile = (dto: ItemFileDTO): ItemFile => ({
  itemId: dto.item_id,
  src: dto.src,
  title: dto.title,
  icon: dto.icon,
})
