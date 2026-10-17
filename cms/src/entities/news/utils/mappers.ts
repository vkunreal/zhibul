import type { NewsDTO, NewsMediaDTO, SaveNewsDTO } from '@shared/api'

import { News, NewsMedia } from '../model'
import { NewsFormValues } from '../store/interfaces'

export const toNewsMedia = (dto: NewsMediaDTO): NewsMedia => ({
  newsId: dto.news_id,
  src: dto.src,
  position: dto.position,
})

export const toNews = (dto: NewsDTO): News => ({
  id: dto.id,
  url: dto.url,
  title: dto.title,
  text: dto.text,
  shortText: dto.short_text,
  date: Number(dto.date),
  seoTitle: dto.seo_title,
  seoDescription: dto.seo_description,
  seoKeywords: dto.seo_keywords,
  media: dto.media.map(toNewsMedia),
})

export const toSaveNewsDTO = (values: NewsFormValues): SaveNewsDTO => ({
  url: values.url,
  title: values.title,
  text: values.text,
  short_text: values.shortText,
  seo_title: values.seoTitle,
  seo_description: values.seoDescription,
  seo_keywords: values.seoKeywords,
})
