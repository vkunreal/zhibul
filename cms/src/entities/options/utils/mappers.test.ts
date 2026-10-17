import { describe, expect, it } from 'vitest'

import { toItemOption } from './mappers'

describe('toItemOption', () => {
  it('мапит опцию и флаги показа', () => {
    expect(
      toItemOption({
        id: 1,
        item_id: 9,
        position: 0,
        name: 'Цвет',
        value: 'Красный',
        show_item: 1,
        show_menu: 0,
        is_dropdown: 1,
      }),
    ).toEqual({
      id: 1,
      itemId: 9,
      position: 0,
      name: 'Цвет',
      value: 'Красный',
      showItem: true,
      showMenu: false,
      isDropdown: true,
    })
  })

  it('для null show_item использует true по умолчанию', () => {
    expect(
      toItemOption({
        id: 2,
        item_id: 9,
        position: 1,
        name: 'Размер',
        value: 'M',
        show_item: null,
        show_menu: null,
        is_dropdown: null,
      }),
    ).toMatchObject({
      showItem: true,
      showMenu: false,
      isDropdown: false,
    })
  })
})
