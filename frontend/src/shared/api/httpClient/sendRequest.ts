import { sendFuntion, SendRequestParams } from './interfaces'
import { getUrl, prepareRequestData, parseResponse } from './utils'

const API_URLS = {
  main: process.env.NEXT_PUBLIC_API_URL ?? '',
  core: process.env.NEXT_PUBLIC_API_CORE_URL ?? '',
}

const resolveUrl = (url: string, api: keyof typeof API_URLS = 'main') => {
  if (/^https?:\/\//.test(url)) return url

  return `${API_URLS[api]}${url}`
}

export const sendRequest: sendFuntion = async <T>({
  url,
  method,
  api = 'main',
  params,
  data,
  responseType = 'json',
  headers = {},
  cache = 'force-cache',
  revalidate = 600,
}: SendRequestParams) => {
  const requestUrl = getUrl({ url: resolveUrl(url, api), params })
  const { body, requestHeaders } = prepareRequestData({ data, headers })

  const response = await fetch(requestUrl, {
    method,
    cache,
    credentials: 'include',
    headers: requestHeaders,
    // next.revalidate keeps the response in the Next.js cache and would
    // override an explicit no-store.
    ...(cache === 'no-store' ? {} : { next: { revalidate } }),
    body,
  })

  const responseData = await parseResponse(response, responseType)

  if (!response.ok) {
    const errorData = responseData
    const httpError = {
      ...errorData,
      status: response.status,
    }
    // getOnServerError(httpError)
    throw httpError
  }

  return {
    data: responseData as T,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  }
}
