interface BuildBody<Data> {
  data: Data
  headers: HeadersInit
}

const isPreparedBody = (data: unknown): data is BodyInit =>
  typeof data === 'string' ||
  data instanceof Blob ||
  data instanceof ArrayBuffer ||
  data instanceof URLSearchParams ||
  ArrayBuffer.isView(data)

export const prepareRequestData = <Data>({
  data,
  headers,
}: BuildBody<Data>) => {
  if (data === null || data === undefined || isPreparedBody(data)) {
    return { body: null, requestHeaders: headers ?? {} }
  }

  if (data instanceof FormData) {
    const cleanedHeaders = headers
      ? Array.isArray(headers)
        ? headers.filter(([key]) => key.toLowerCase() !== 'content-type')
        : Object.fromEntries(
            Object.entries(headers).filter(
              ([key]) => key.toLowerCase() !== 'content-type',
            ),
          )
      : {}

    return { body: data, requestHeaders: cleanedHeaders }
  }

  const jsonBody = JSON.stringify(data)
  const requestHeaders = headers ?? {}

  if (headers) {
    const hasContentType = Array.isArray(headers)
      ? headers.some(([key]) => key.toLowerCase() === 'content-type')
      : Object.keys(headers).some((key) => key.toLowerCase() === 'content-type')

    if (!hasContentType) {
      if (Array.isArray(requestHeaders)) {
        requestHeaders.push(['Content-Type', 'application/json'])
      } else {
        ;(requestHeaders as Record<string, string>)['Content-Type'] =
          'application/json'
      }
    }
  } else {
    ;(requestHeaders as Record<string, string>)['Content-Type'] =
      'application/json'
  }

  return { body: jsonBody, requestHeaders }
}
