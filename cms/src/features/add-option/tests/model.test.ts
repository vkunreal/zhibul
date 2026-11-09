import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import { $options, addOptionFx, getOptionsFx } from '@entities/options'
import { ItemOption } from '@entities/options/model'
import { OptionRequest } from '@entities/options/store/interfaces'
import type { AddOptionDTO } from '@shared/api'

import { addOptionSubmitted } from '../model'

const option = (id: number, position: number): ItemOption => ({
  id,
  itemId: 7,
  position,
  name: String(id),
  value: '',
  showItem: true,
  showMenu: false,
  isDropdown: false,
})

describe('add-option model', () => {
  it('ставит новую опцию после последней по текущему списку', async () => {
    const added: OptionRequest<AddOptionDTO>[] = []
    const scope = fork({
      values: [[$options, [option(1, 1), option(2, 5), option(3, 2)]]],
      handlers: [
        [
          addOptionFx,
          async (request: OptionRequest<AddOptionDTO>) => {
            added.push(request)
            return request.itemId
          },
        ],
        [getOptionsFx, async () => []],
      ],
    })

    await allSettled(addOptionSubmitted, {
      scope,
      params: { itemId: 7, name: 'Цвет', value: 'Красный' },
    })

    expect(added).toEqual([
      {
        option: { name: 'Цвет', value: 'Красный', item_id: 7, position: 6 },
        itemId: 7,
      },
    ])
  })

  it('не отправляет опцию с пустым названием', async () => {
    let called = false
    const scope = fork({
      handlers: [
        [
          addOptionFx,
          async () => {
            called = true
            return 7
          },
        ],
      ],
    })

    await allSettled(addOptionSubmitted, {
      scope,
      params: { itemId: 7, name: ' ', value: 'x' },
    })

    expect(called).toBe(false)
  })
})
