/** Строка таблицы `news_media` — картинка новости. */
export interface NewsMediaDTO {
  news_id: number
  src: string
  position: number
}

/**
 * Новость из `GET /api/news` и `GET /api/news/id/:id`: строка `news`
 * и её картинки, отсортированные по `position`.
 * `date` — момент публикации, миллисекунды Unix-времени строкой.
 */
export interface NewsDTO {
  id: number
  url: string
  title: string
  text: string
  short_text: string
  date: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  media: NewsMediaDTO[]
}

/**
 * Тело `POST /api/news/` и `PUT /api/news/`: при изменении новость
 * ищется по `url`, дату ставит сервер при создании.
 */
export interface SaveNewsDTO {
  url: string
  title: string
  text: string
  short_text: string
  seo_title: string
  seo_description: string
  seo_keywords: string
}

/**
 * Тело `DELETE /api/news/`. Сервер всегда отвечает `{ status: false }`,
 * даже после успешного удаления.
 */
export interface DeleteNewsDTO {
  id: number
}

/** Тело `DELETE /api/news/media`. */
export interface DeleteNewsMediaDTO {
  src: string
}
