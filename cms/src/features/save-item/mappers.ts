import { Country } from '@entities/countries/model'
import { Item } from '@entities/items/model'
import type { AddItemDTO, ChangeItemDTO } from '@shared/api'
import { toNullableNumber } from '@shared/utils'

import { emptyItemForm } from './constants'
import { ChangeItemPayload, ItemFormValues } from './interfaces'

const manufacturerId = (countries: Country[], name: string) =>
  countries.find((country) => country.name === name)?.id ?? 0

const manufacturerName = (countries: Country[], name: string) =>
  countries.find((country) => country.name === name)?.name || ''

export const toItemForm = (
  item: Item | null,
  countries: Country[],
): ItemFormValues => {
  if (!item) return emptyItemForm

  return {
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    url: item.url,
    position: item.position,
    name: item.name,
    description: item.description,
    brand: item.brand,
    manufacturer: manufacturerName(countries, item.manufacturer),
    price: item.price,
    valute: String(item.valuteId),
    purchase: item.purchasePrice?.toString() ?? '',
    profitability: item.profitability?.toString() ?? '',
    postfix: item.pricePostfix,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    seoKeywords: item.seoKeywords,
    isActive: item.isActive,
    isOrderOnly: item.isOrderOnly,
  }
}

export const toAddItemDTO = (
  values: ItemFormValues,
  countries: Country[],
): AddItemDTO => ({
  category_id: values.categoryId,
  position: values.position,
  url: values.url,
  name: values.name,
  description: values.description,
  brand: values.brand,
  manufacturer: manufacturerId(countries, values.manufacturer),
  price: values.price,
  valute_id: Number(values.valute),
  purchase_price: toNullableNumber(values.purchase),
  profitabilaty: toNullableNumber(values.profitability),
  price_postfix: values.postfix,
  seo_title: values.seoTitle,
  seo_description: values.seoDescription,
  seo_keywords: values.seoKeywords,
  is_active: values.isActive,
  is_order_only: values.isOrderOnly,
})

export const toChangeItemDTO = (
  countries: Country[],
  { values, item }: ChangeItemPayload,
): ChangeItemDTO => ({
  ...toAddItemDTO(values, countries),
  item_id: item.id,
})
