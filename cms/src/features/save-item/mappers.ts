import { Country } from '@entities/countries/model'
import type { AddItemDTO, ChangeItemDTO } from '@shared/api'
import { toNullableNumber } from '@shared/utils'


import { ChangeItemPayload, ItemFormValues } from './interfaces'

const manufacturerId = (countries: Country[], name: string) =>
  countries.find((country) => country.name === name)?.id ?? 0

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
