import { SendRequestParams } from '../interfaces'

const getContentTypeFromHeaders = (headers: Headers) => {
  return headers.get('content-type')?.split(';')[0]?.trim() ?? null
}

export const parseResponse = async (
  response: Response,
  responseType?: SendRequestParams['responseType'],
) => {
  if ([204, 205, 304].includes(response.status)) {
    return null
  }

  if (responseType) {
    switch (responseType) {
      case 'json':
        return await response.json()
      case 'text':
        return await response.text()
      case 'blob':
        return await response.blob()
      case 'arraybuffer':
        return await response.arrayBuffer()
      case 'stream':
        return response.body
      case 'document':
        return await response.text()
    }
  }

  const contentType = getContentTypeFromHeaders(response.headers)

  if (contentType) {
    if (
      contentType.includes('application/json') ||
      contentType.includes('text/json')
    ) {
      return await response.json()
    }
    if (contentType.includes('text/')) {
      return await response.text()
    }
    if (
      contentType.includes('application/octet-stream') ||
      contentType.includes('image/')
    ) {
      return await response.blob()
    }
  }

  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
