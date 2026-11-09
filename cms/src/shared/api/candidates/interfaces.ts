/**
 * Строка таблицы `candidates` из `GET /api/candidates`: посетитель начал
 * заполнять форму обратной связи, но не отправил её. Все поля, кроме id,
 * необязательны.
 */
export interface CandidateDTO {
  id: number
  phone: string | null
  name: string | null
  company: string | null
  email: string | null
  comment: string | null
}

/** Тело `DELETE /api/candidate`. */
export interface DeleteCandidateDTO {
  id: number
}
