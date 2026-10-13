/** Ответ сервера на запрос SMS: сколько секунд живёт код и сколько в нём цифр. */
export interface IssuedCode {
  ttl: number
  length: number
}

/** Код выдан: телефон в том виде, как его ввёл пользователь, и ответ сервера. */
export interface CodeIssuedPayload {
  phone: string
  issued: IssuedCode
}

/** Всё, что нужно шагу ввода кода. */
export interface CodeSession {
  /** Телефон с маской, например `+375 (29) 111-11-11`. */
  phone: string
  issued: IssuedCode
  /** Момент истечения кода в миллисекундах (`Date.now()`-шкала). */
  expiresAt: number
}
