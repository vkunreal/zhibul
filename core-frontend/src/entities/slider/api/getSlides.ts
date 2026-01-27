import { apiGet } from '@/shared/api/base'

import type { Slide } from '../interfaces'

const ENDPOINTS = {
  slider: '/api/slider',
}

export const getSlides = async () => {
  const slides = await apiGet<Slide[]>(ENDPOINTS.slider, 3600)

  return slides
}
