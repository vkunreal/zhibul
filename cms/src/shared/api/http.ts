import axios, { AxiosError, Method } from 'axios'
import { z } from 'zod'

import { $token, sessionCleared } from '../auth'
import { env } from '../config'

// Просроченный и неверный токен бэкенд отклоняет статусом 403, не 401.
const isExpiredSession = (status?: number) => status === 401 || status === 403

interface RequestBase {
  method: Method
  path: string
  auth?: boolean
  body?: unknown
  params?: Record<string, string | number>
}

interface RequestWithSchema<Schema extends z.ZodType> extends RequestBase {
  schema: Schema
}

interface RequestWithoutSchema extends RequestBase {
  schema?: undefined
}

// Невалидный ответ не роняет приложение: ошибка уходит в консоль,
// а данные отдаются дальше как есть.
export const validateResponse = <Schema extends z.ZodType>(
  schema: Schema,
  data: unknown,
  endpoint: string,
): z.output<Schema> => {
  const result = schema.safeParse(data)
  if (result.success) return result.data

  console.error(
    `Ответ ${endpoint} не прошёл валидацию:\n${z.prettifyError(result.error)}`,
  )

  return data as z.output<Schema>
}

const apiUrl = (path: string) => `${env.apiUrl}${path}`

const authHeaders = () => ({
  authorization: $token.getState(),
})

export async function request<Schema extends z.ZodType>(
  options: RequestWithSchema<Schema>,
): Promise<z.output<Schema>>
export async function request(options: RequestWithoutSchema): Promise<void>
export async function request<Schema extends z.ZodType>({
  method,
  path,
  schema,
  auth,
  body,
  params,
}:
  | RequestWithSchema<Schema>
  | RequestWithoutSchema): Promise<z.output<Schema> | void> {
  let data: unknown
  try {
    ;({ data } = await axios.request<unknown>({
      method,
      url: apiUrl(path),
      data: body,
      params,
      headers: auth ? authHeaders() : undefined,
    }))
  } catch (error) {
    if (
      auth &&
      error instanceof AxiosError &&
      isExpiredSession(error.response?.status)
    ) {
      sessionCleared()
    }
    throw error
  }

  if (!schema) return

  return validateResponse(schema, data, `${method} ${apiUrl(path)}`)
}
