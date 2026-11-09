import { z } from 'zod'

import { NewsDTO, NewsMediaDTO } from './interfaces'

export const newsMediaSchema: z.ZodType<NewsMediaDTO> = z.object({
  news_id: z.number(),
  src: z.string(),
  position: z.number(),
})

export const newsMediaListSchema = z.array(newsMediaSchema)

export const newsSchema: z.ZodType<NewsDTO> = z.object({
  id: z.number(),
  url: z.string(),
  title: z.string(),
  text: z.string(),
  short_text: z.string(),
  date: z.string(),
  seo_title: z.string(),
  seo_description: z.string(),
  seo_keywords: z.string(),
  media: newsMediaListSchema,
})

export const newsListSchema = z.array(newsSchema)
