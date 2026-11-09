export type RequestType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type QueryParamPrimitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined

export type QueryParamValue =
  | QueryParamPrimitive
  | QueryParamPrimitive[]
  | Record<string, QueryParamPrimitive>

export interface QueryParams {
  [key: string]: QueryParamValue
}

export type ApiName = 'main' | 'core'

export interface SendRequestParams {
  url: string
  method: RequestType
  api?: ApiName
  responseType?:
    | 'json'
    | 'text'
    | 'blob'
    | 'arraybuffer'
    | 'stream'
    | 'document'
  params?: QueryParams
  data?: unknown
  headers?: HeadersInit
  cache?: RequestCache
  revalidate?: number | false
}

export type HttpClientRequest<Params extends QueryParams = QueryParams> = Omit<
  SendRequestParams,
  'method' | 'params'
> & {
  params?: Params
}

export type HttpClientBodyRequest<
  Data = unknown,
  Params extends QueryParams = QueryParams,
> = Omit<SendRequestParams, 'method' | 'params' | 'data'> & {
  data: Data
  params?: Params
}

export interface HttpResponse<T> {
  data: T
  status: number
  headers: Headers
}

export type sendFuntion = <T>(
  params: SendRequestParams,
) => Promise<HttpResponse<T>>
