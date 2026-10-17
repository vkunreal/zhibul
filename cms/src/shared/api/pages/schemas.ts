import { z } from 'zod'

import { PageDTO } from './interfaces'

export const pageSchema: z.ZodType<PageDTO> = z.object({
  url: z.string(),
  name: z.string(),
  text: z.string().nullable(),
  seo_title: z.string().nullable(),
  seo_description: z.string().nullable(),
  seo_keywords: z.string().nullable(),
})

export const pagesSchema = z.array(pageSchema)
