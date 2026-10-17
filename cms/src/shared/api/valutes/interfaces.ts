/**
 * Строка таблицы `valutes` из `GET /api/valutes`.
 * `title` — код валюты (`USD`, `EUR`), `value` — курс к BYN.
 */
export interface ValuteDTO {
  id: number
  title: string | null
  value: number
}

/** Тело `PUT /api/valutes`. */
export interface ChangeValuteDTO {
  id: number
  value: number
}
