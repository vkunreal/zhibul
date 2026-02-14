import { apiGet } from '@/shared/api'

import { Trailer } from '../model'

const ENDPOINTS = {
  trailers: '/api/trailers-rent/',
  trailer: (slug: string) => `/api/trailers-rent/${slug}`,
}

export const trailersApi = {
  async getAllTrailers() {
    const trailers = await apiGet<Trailer[]>(ENDPOINTS.trailers)

    return trailers
  },

  async getTrailer(slug: string) {
    const trailer = await apiGet<Trailer>(ENDPOINTS.trailer(slug))

    return trailer
  },
}
