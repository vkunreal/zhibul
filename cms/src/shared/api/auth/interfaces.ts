/** Тело `POST /api/login`. Пароль — от 4 до 32 символов. */
export interface LoginDTO {
  name: string
  password: string
}

/** Ответ `POST /api/login`: токен для заголовка `authorization`. */
export interface LoginResponseDTO {
  token: string
}
