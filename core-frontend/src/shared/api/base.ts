import https from 'https'

import axios from 'axios'

const API = process.env.API_URL

export const apiInstance = axios.create({
  baseURL: API,
  timeout: 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

export const apiGet = async <T>(url: string, revalidate?: number) => {
  try {
    const response = await apiInstance.get<T>(`${API}${url}`, {
      headers: {
        'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
      },
    })

    return response.data
  } catch (e) {
    console.error('NETWORK ERROR: ', url, e)
  }
}
