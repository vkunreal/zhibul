import type { PageDTO, SavePageDTO } from '@shared/api'

import { Page } from '../model'

export const toPage = (dto: PageDTO): Page => ({
  url: dto.url,
  name: dto.name,
  text: dto.text ?? '',
  seoTitle: dto.seo_title ?? '',
  seoDescription: dto.seo_description ?? '',
  seoKeywords: dto.seo_keywords ?? '',
})

export const toSavePageDTO = (page: Page): SavePageDTO => ({
  url: page.url,
  name: page.name,
  text: page.text,
  seo_title: page.seoTitle,
  seo_description: page.seoDescription,
  seo_keywords: page.seoKeywords,
})
