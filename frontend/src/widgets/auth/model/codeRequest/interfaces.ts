/** Принятая отправка номера. attempt отличает этот запрос от старых. */
export interface PhoneAttempt {
  /** Телефон с маской, как его ввёл пользователь. */
  phone: string
  attempt: number
}

/** Параметры запроса SMS. */
export interface CodeRequest extends PhoneAttempt {
  /** Только цифры номера, в таком виде его ждёт API. */
  phoneNumber: string
}
