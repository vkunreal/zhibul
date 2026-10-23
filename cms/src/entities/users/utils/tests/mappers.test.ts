import { describe, expect, it } from 'vitest'

import { toCandidate, toUser } from '../mappers'

describe('users mappers', () => {
  it('toUser мапит пользователя и время', () => {
    expect(
      toUser({
        id: 1,
        phone: '+37529',
        name: 'Иван',
        company: null,
        email: null,
        comment: null,
        time: '1700000000000',
      }),
    ).toEqual({
      id: 1,
      phone: '+37529',
      name: 'Иван',
      company: '',
      email: '',
      comment: '',
      time: 1700000000000,
    })
  })

  it('toUser ставит time=null без значения', () => {
    expect(
      toUser({
        id: 2,
        phone: '1',
        name: 'A',
        company: 'C',
        email: 'a@b.c',
        comment: 'x',
        time: null,
      }).time,
    ).toBeNull()
  })

  it('toCandidate подставляет пустые строки', () => {
    expect(
      toCandidate({
        id: 3,
        phone: null,
        name: null,
        company: null,
        email: null,
        comment: null,
      }),
    ).toEqual({
      id: 3,
      phone: '',
      name: '',
      company: '',
      email: '',
      comment: '',
    })
  })
})
