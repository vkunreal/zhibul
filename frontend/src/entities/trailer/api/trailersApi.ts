import { httpClient } from '@/shared/api'

import { Trailer, TrailerRent } from '../model'

const ENDPOINTS = {
  trailers: '/api/trailers-rent/',
  trailer: (slug: string) => `/api/trailers-rent/${slug}`,
}

export const trailersApi = {
  async getAllTrailers() {
    const { data } = await httpClient.get<TrailerRent[]>({
      url: ENDPOINTS.trailers,
    })

    return data
  },

  async getTrailer(slug: string) {
    const { data } = await httpClient.get<Trailer[]>({
      url: ENDPOINTS.trailer(slug),
    })

    return data?.[0]
  },
}
