import type { ValuteDTO } from '@shared/api'

import { Valute } from '../model'

export const toValute = (dto: ValuteDTO): Valute => ({
  id: dto.id,
  title: dto.title ?? '',
  value: dto.value,
})
