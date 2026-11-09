/**
 * Строка таблицы `pages` из `GET /api/pages` — статическая страница сайта.
 * `url` — первичный ключ (`delivery`, `contacts`, ...).
 */
export interface PageDTO {
  url: string
  name: string
  text: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

/** Тело `POST /api/page` и `PUT /api/page`: страница ищется по `url`. */
export interface SavePageDTO {
  url: string
  name: string
  text: string
  seo_title: string
  seo_description: string
  seo_keywords: string
}

/** Тело `DELETE /api/page`. */
export interface DeletePageDTO {
  url: string
}
