/**
 * Строка таблицы `files` из `GET /api/files/:item_id` — документ,
 * прикреплённый к товару. Своего id у файла нет, его ключ — `src`.
 * `icon` — ключ иконки (`options`, `book`, `warning`).
 */
export interface ItemFileDTO {
  item_id: number
  src: string
  title: string
  icon: string
}

/**
 * Ответ `POST /api/file` (multipart: `file`, `item_id`, `title`, `icon`).
 * `item_id` приходит строкой, потому что сервер берёт его из полей формы.
 */
export interface UploadItemFileResponseDTO {
  status: boolean
  response: {
    item_id: string
    fileUrl: string
    title: string
    icon: string
  }
}

/** Тело `DELETE /api/file`. */
export interface DeleteItemFileDTO {
  src: string
}
