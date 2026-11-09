import { httpClient } from '@/shared/api'

const ENDPOINTS = {
  getAuthCode: '/api/unauth/v1/auth/getAuthCode',
  verifyCode: '/api/unauth/v1/auth',
  me: '/api/public/v1/auth/me',
}

export const authApi = {
  async getAuthCode(phoneNumber: string) {
    const response = await httpClient.post<{
      ttl: number
      length: number
    }>({
      api: 'core',
      url: ENDPOINTS.getAuthCode,
      data: { phoneNumber },
    })
    return response
  },

  async auth(data: { phoneNumber: string; code: string }) {
    const response = await httpClient.post<undefined>({
      api: 'core',
      url: ENDPOINTS.verifyCode,
      data,
    })
    return response
  },

  async me() {
    const response = await httpClient.get<{
      id: string
      sessionId: string
      roles: string[]
    }>({
      api: 'core',
      url: ENDPOINTS.me,
      cache: 'no-store',
    })

    return response
  },
}
