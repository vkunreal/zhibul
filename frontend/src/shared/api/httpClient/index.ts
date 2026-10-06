import {
  HttpClientBodyRequest,
  HttpClientRequest,
  QueryParams,
} from './interfaces'
import { sendRequest } from './sendRequest'

// TODO: сделать обработку упавших запросов
// TODO: сделать обработку 401 и 403 ошибок
// TODO: сделать кастомную обработку ошибок
// TODO: доработать ретраи
// TODO?: Отправлять на какую-нибудь ручку данные об упавших запросах
// TODO?: Добавить валидацию Zod
const httpClient = {
  async get<T, Params extends QueryParams = QueryParams>(
    config: HttpClientRequest<Params>,
  ) {
    const response = await sendRequest<T>({
      ...config,
      method: 'GET',
    })
    return response
  },

  async post<T, Body = unknown, Params extends QueryParams = QueryParams>(
    config: HttpClientBodyRequest<Body, Params>,
  ) {
    const response = await sendRequest<T>({
      ...config,
      method: 'POST',
    })
    return response
  },

  async put<T, Body = unknown, Params extends QueryParams = QueryParams>(
    config: HttpClientBodyRequest<Body, Params>,
  ) {
    const response = await sendRequest<T>({
      ...config,
      method: 'PUT',
    })
    return response
  },

  async patch<T, Body = unknown, Params extends QueryParams = QueryParams>(
    config: HttpClientBodyRequest<Body, Params>,
  ) {
    const response = await sendRequest<T>({
      ...config,
      method: 'PATCH',
    })
    return response
  },

  async delete<T, Params extends QueryParams = QueryParams>(
    config: HttpClientRequest<Params>,
  ) {
    const response = await sendRequest<T>({
      ...config,
      method: 'DELETE',
    })
    return response
  },
}

export { httpClient }
