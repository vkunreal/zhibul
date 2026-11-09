import { describe, expect, it } from 'vitest'

import { ItemOption } from '@entities/options/model'

import { reorderOptions } from '../reorder'

const option = (id: number, position: number): ItemOption => ({
  id,
  itemId: 1,
  position,
  name: String(id),
  value: '',
  showItem: true,
  showMenu: false,
  isDropdown: false,
})

describe('reorderOptions', () => {
  it('меняет две карточки местами и не сдвигает опции между ними', () => {
    const items = [option(1, 10), option(2, 20), option(3, 30)]

    expect(reorderOptions(items, 1, 3).map(({ id, position }) => ({ id, position }))).toEqual([
      { id: 3, position: 10 },
      { id: 2, position: 20 },
      { id: 1, position: 30 },
    ])
  })

  it('так же меняет местами, если тянуть нижнюю карточку на верхнюю', () => {
    const items = [option(1, 10), option(2, 20), option(3, 30)]

    expect(reorderOptions(items, 3, 1).map(({ id, position }) => ({ id, position }))).toEqual([
      { id: 3, position: 10 },
      { id: 2, position: 20 },
      { id: 1, position: 30 },
    ])
  })

  it('не меняет список, если бросили карточку на себя', () => {
    const items = [option(1, 2), option(2, 1)]

    expect(reorderOptions(items, 1, 1).map(({ id }) => id)).toEqual([2, 1])
  })
})
