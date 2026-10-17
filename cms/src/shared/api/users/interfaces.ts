/**
 * Строка таблицы `users` из `GET /api/users` — заявка с формы обратной связи.
 * `time` — момент отправки, миллисекунды Unix-времени строкой.
 */
export interface UserDTO {
  id: number
  phone: string
  name: string
  company: string | null
  email: string | null
  comment: string | null
  time: string | null
}

/** Тело `DELETE /api/user`. */
export interface DeleteUserDTO {
  id: number
}
