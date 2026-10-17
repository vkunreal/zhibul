/**
 * Строка таблицы `app_variables` из `GET /api/variables` — глобальная
 * переменная сайта. `name` — ключ из `variablesList` (`phone`, `email`, ...).
 */
export interface VariableDTO {
  id: number
  name: string
  value: string
}

/** Тело `POST /api/variable`. */
export interface AddVariableDTO {
  name: string
  value: string
}

/** Тело `PUT /api/variable`. */
export interface ChangeVariableDTO {
  id: number
  name: string
  value: string
}

/** Тело `DELETE /api/variable`. */
export interface DeleteVariableDTO {
  id: number
}
