/** Заявка с формы обратной связи. */
export interface User {
  id: number
  phone: string
  name: string
  company: string
  email: string
  comment: string
  /** Момент отправки, миллисекунды Unix-времени. */
  time: number | null
}

/** Посетитель, который начал заполнять форму, но не отправил её. */
export interface Candidate {
  id: number
  phone: string
  name: string
  company: string
  email: string
  comment: string
}
