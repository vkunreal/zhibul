import { z } from 'zod'

import {
  AddCategoryResponseDTO,
  CategoryDTO,
  CategorySortModeDTO,
  CategoryWithItemsCountDTO,
  SetCategoryActiveResponseDTO,
  UploadCategoryImageResponseDTO,
} from './interfaces'

export const categorySortModeSchema: z.ZodType<CategorySortModeDTO> = z.enum([
  'manual',
  'alphabet',
  'random',
  'price_asc',
  'price_desc',
  'newest',
])

const categoryShape = {
  id: z.number(),
  parent_id: z.number().nullable(),
  position: z.number().nullable(),
  name: z.string(),
  url: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  is_contains: z.number(),
  active: z.number(),
  sort_mode: categorySortModeSchema,
  seo_title: z.string().nullable(),
  seo_description: z.string().nullable(),
  seo_keywords: z.string().nullable(),
}

export const categorySchema: z.ZodType<CategoryDTO> = z.object(categoryShape)

export const categoriesWithItemsCountSchema: z.ZodType<
  CategoryWithItemsCountDTO[]
> = z.array(
  z.object({
    ...categoryShape,
    items_count: z.number(),
  }),
)

export const addCategoryResponseSchema: z.ZodType<AddCategoryResponseDTO> =
  z.object({
    status: z.boolean(),
    data: categorySchema,
  })

export const setCategoryActiveResponseSchema: z.ZodType<SetCategoryActiveResponseDTO> =
  z.object({
    active: z.boolean(),
  })

export const uploadCategoryImageResponseSchema: z.ZodType<UploadCategoryImageResponseDTO> =
  z.object({
    status: z.boolean(),
    url: z.string(),
  })
