import { describe, expect, it } from 'vitest'

import { getDate } from '../date'

describe('getDate', () => {
  it('форматирует локальную дату с ведущими нулями', () => {
    const time = new Date(2024, 0, 5, 9, 3).getTime()
    expect(getDate(time)).toBe('05.01.2024 09:03')
  })

  it('форматирует дату без ведущих нулей для двузначных значений', () => {
    const time = new Date(2024, 10, 15, 14, 45).getTime()
    expect(getDate(time)).toBe('15.11.2024 14:45')
  })
})
