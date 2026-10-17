import { describe, expect, it } from 'vitest'

import { toValute } from './mappers'

describe('toValute', () => {
  it('мапит валюту и пустой title', () => {
    expect(toValute({ id: 1, title: 'BYN', value: 1 })).toEqual({
      id: 1,
      title: 'BYN',
      value: 1,
    })
    expect(toValute({ id: 2, title: null, value: 3.2 })).toEqual({
      id: 2,
      title: '',
      value: 3.2,
    })
  })
})
