import type {
  QueryParamPrimitive,
  QueryParams,
  QueryParamValue,
} from '../interfaces'

const isRecord = (
  value: QueryParamValue,
): value is Record<string, QueryParamPrimitive> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

const appendValue = (
  query: URLSearchParams,
  key: string,
  value: QueryParamValue,
) => {
  if (value === undefined) return

  if (isRecord(value)) {
    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      appendValue(query, `${key}[${nestedKey}]`, nestedValue)
    }
    return
  }

  if (Array.isArray(value)) {
    for (const nestedValue of value) {
      appendValue(query, `${key}[]`, nestedValue)
    }
    return
  }

  query.append(key, String(value))
}

export const buildQuery = (params: QueryParams = {}): string => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    appendValue(query, key, value)
  }

  return query.toString()
}

export const getUrl = ({
  url,
  params,
}: {
  url: string
  params?: QueryParams
}) => {
  const query = buildQuery(params)

  if (!query) return url

  const separator = url.includes('?') ? '&' : '?'

  return `${url}${separator}${query}`
}
