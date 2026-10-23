import { Valute } from '@entities/valutes/model'

export const toValuteForm = (valute: Valute) => ({
  value: String(valute.value),
})
