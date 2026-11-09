// Запрос SMS: номер с формы → requestCodeFx → шаг кода или экран ошибки.
// Связи между событиями, эффектом и сторами описаны в samples.ts.
import './samples'

export { phoneSubmitted } from './events'
export { requestCodeFx } from './effects'
export type { CodeRequest } from './interfaces'
