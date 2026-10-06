import { describe, expect, it, vi } from 'vitest'

import { getCells, placeDigits, writeDigits } from '../cells'

describe('getCells', () => {
  it('дополняет короткую строку пробелами до длины кода', () => {
    expect(getCells('12', 6)).toEqual(['1', '2', ' ', ' ', ' ', ' '])
  })

  it('обрезает строку длиннее кода', () => {
    expect(getCells('1234567', 6)).toEqual(['1', '2', '3', '4', '5', '6'])
  })

  it('сохраняет уже стоящие пробелы на своих индексах', () => {
    expect(getCells('1 3', 4)).toEqual(['1', ' ', '3', ' '])
  })
})

describe('placeDigits', () => {
  it('кладёт цифры с указанной клетки и отбрасывает нецифровые символы', () => {
    expect(placeDigits('12', 'ab3c4', 2, 6)).toEqual({
      cells: ['1', '2', '3', '4', ' ', ' '],
      digits: '34',
    })
  })

  it('игнорирует цифры, которые не помещаются в код', () => {
    expect(placeDigits('', '98765', 4, 6).cells).toEqual([
      ' ',
      ' ',
      ' ',
      ' ',
      '9',
      '8',
    ])
  })

  it('не меняет клетки, если во входящей строке нет цифр', () => {
    expect(placeDigits('12', 'abc', 0, 4)).toEqual({
      cells: ['1', '2', ' ', ' '],
      digits: '',
    })
  })
})

describe('writeDigits', () => {
  it('возвращает строку кода и ставит фокус на последнюю записанную клетку', () => {
    const focusDigit = vi.fn()

    expect(writeDigits('12', '99', 2, 6, focusDigit)).toBe('1299  ')
    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(3)
  })

  it('на переполнении фокусирует последнюю клетку кода, а не отброшенный хвост', () => {
    const focusDigit = vi.fn()

    writeDigits('', '123456789', 0, 6, focusDigit)

    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(5)
  })

  it('не двигает фокус, если вставлять нечего', () => {
    const focusDigit = vi.fn()

    expect(writeDigits('12', 'abc', 2, 6, focusDigit)).toBe('12    ')
    expect(focusDigit).not.toHaveBeenCalled()
  })
})
