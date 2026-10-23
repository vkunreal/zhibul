import { z } from 'zod'

import { CopiedItemDTO, ItemDTO, ItemImageDTO, ItemsPageDTO } from './interfaces'

export const itemSchema: z.ZodType<ItemDTO> = z.object({
  id: z.number(),
  code: z.string().nullable(),
  position: z.number().nullable(),
  category_id: z.number(),
  category_url: z.string(),
  category_name: z.string(),
  url: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  brand: z.string().nullable(),
  manufacturer: z.string().nullable(),
  price: z.string().nullable(),
  valute_id: z.number(),
  purchase_price: z.number().nullable(),
  profitabilaty: z.number().nullable(),
  price_postfix: z.string().nullable(),
  display_price: z.string().optional().default(''),
  seo_title: z.string().nullable(),
  seo_description: z.string().nullable(),
  seo_keywords: z.string().nullable(),
  is_active: z.number(),
  is_order_only: z.number(),
})

export const itemsPageSchema: z.ZodType<ItemsPageDTO> = z.object({
  data: z.array(itemSchema),
  count: z.number(),
  prev: z.string().nullable(),
  next: z.string().nullable(),
})

export const itemImageSchema: z.ZodType<ItemImageDTO> = z.object({
  item_id: z.number(),
  src: z.string(),
  is_main: z.number().nullable(),
})

export const itemImagesSchema = z.array(itemImageSchema)

export const copiedItemSchema: z.ZodType<CopiedItemDTO> = z.object({
  id: z.number(),
  url: z.string(),
  category_url: z.string(),
})
