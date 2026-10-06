import { httpClient } from '@/shared/api'

import type { Slide } from '../interfaces'

const ENDPOINTS = {
  slider: '/api/slider',
}

export const getSlides = async () => {
  const { data } = await httpClient.get<Slide[]>({
    url: ENDPOINTS.slider,
    revalidate: 3600,
  })

  return data
}
