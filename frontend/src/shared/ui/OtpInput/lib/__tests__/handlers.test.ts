import { describe, expect, it, vi } from 'vitest'

import { getCells } from '../cells'
import { handleDigitChange, handleDigitKey, handleDigitPaste } from '../handlers'

const length = 6

const setup = (value: string) => ({
  cells: getCells(value, length),
  onChange: vi.fn(),
  focusDigit: vi.fn(),
  onSubmit: vi.fn(),
})

describe('handleDigitChange', () => {
  it('пишет одну цифру и переводит фокус на следующую клетку', () => {
    const { cells, onChange, focusDigit } = setup('')

    handleDigitChange('5', '', cells, 0, length, onChange, focusDigit)

    expect(onChange).toHaveBeenCalledExactlyOnceWith('5     ')
    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(1)
  })

  it('берёт последнюю цифру, если браузер дописал её к уже стоящему символу', () => {
    const { cells, onChange, focusDigit } = setup('1')

    handleDigitChange('x7', '1', cells, 0, length, onChange, focusDigit)

    expect(onChange).toHaveBeenCalledExactlyOnceWith('7     ')
    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(1)
  })

  it('на последней клетке не сдвигает фокус дальше кода', () => {
    const { cells, onChange, focusDigit } = setup('12345')

    handleDigitChange('6', '12345', cells, 5, length, onChange, focusDigit)

    expect(onChange).toHaveBeenCalledExactlyOnceWith('123456')
    expect(focusDigit).not.toHaveBeenCalled()
  })

  it('очищает клетку, если в вводе нет цифры', () => {
    const { cells, onChange, focusDigit } = setup('12')

    handleDigitChange('a', '12', cells, 0, length, onChange, focusDigit)

    expect(onChange).toHaveBeenCalledExactlyOnceWith(' 2    ')
    expect(focusDigit).not.toHaveBeenCalled()
  })

  it('несколько цифр сразу вставляет пачкой с текущей клетки', () => {
    const { cells, onChange, focusDigit } = setup('12')

    handleDigitChange('34ab56', '12', cells, 2, length, onChange, focusDigit)

    expect(onChange).toHaveBeenCalledExactlyOnceWith('123456')
    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(5)
  })
})

describe('handleDigitPaste', () => {
  it('вставляет цифры из буфера и фокусирует последнюю записанную клетку', () => {
    const { onChange, focusDigit } = setup('12')

    handleDigitPaste('3-4 5', '12', 2, length, onChange, focusDigit)

    expect(onChange).toHaveBeenCalledExactlyOnceWith('12345 ')
    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(4)
  })
})

describe('handleDigitKey', () => {
  it('в заполненной клетке стирает только её и оставляет фокус', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('12')

    const handled = handleDigitKey(
      'Backspace',
      cells,
      1,
      length,
      onChange,
      focusDigit,
      onSubmit,
    )

    expect(handled).toBe(true)
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1     ')
    expect(focusDigit).not.toHaveBeenCalled()
  })

  it('в пустой клетке стирает предыдущую и переводит туда фокус', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('12')

    const handled = handleDigitKey(
      'Backspace',
      cells,
      2,
      length,
      onChange,
      focusDigit,
      onSubmit,
    )

    expect(handled).toBe(true)
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1     ')
    expect(focusDigit).toHaveBeenCalledExactlyOnceWith(1)
  })

  it('на пустой первой клетке ничего не меняет, но клавишу считает обработанной', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('')

    const handled = handleDigitKey(
      'Backspace',
      cells,
      0,
      length,
      onChange,
      focusDigit,
      onSubmit,
    )

    expect(handled).toBe(true)
    expect(onChange).not.toHaveBeenCalled()
    expect(focusDigit).not.toHaveBeenCalled()
  })

  it('стрелки только двигают фокус', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('12')

    expect(
      handleDigitKey(
        'ArrowLeft',
        cells,
        1,
        length,
        onChange,
        focusDigit,
        onSubmit,
      ),
    ).toBe(true)
    expect(
      handleDigitKey(
        'ArrowRight',
        cells,
        1,
        length,
        onChange,
        focusDigit,
        onSubmit,
      ),
    ).toBe(true)

    expect(focusDigit).toHaveBeenNthCalledWith(1, 0)
    expect(focusDigit).toHaveBeenNthCalledWith(2, 2)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('не перехватывает стрелку, которой некуда двигаться', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('')

    expect(
      handleDigitKey(
        'ArrowLeft',
        cells,
        0,
        length,
        onChange,
        focusDigit,
        onSubmit,
      ),
    ).toBe(false)
    expect(
      handleDigitKey(
        'ArrowRight',
        cells,
        length - 1,
        length,
        onChange,
        focusDigit,
        onSubmit,
      ),
    ).toBe(false)
    expect(focusDigit).not.toHaveBeenCalled()
  })

  it('Enter отправляет форму', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('123456')

    const handled = handleDigitKey(
      'Enter',
      cells,
      5,
      length,
      onChange,
      focusDigit,
      onSubmit,
    )

    expect(handled).toBe(true)
    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('цифру и прочие клавиши оставляет полю', () => {
    const { cells, onChange, focusDigit, onSubmit } = setup('')

    expect(
      handleDigitKey('1', cells, 0, length, onChange, focusDigit, onSubmit),
    ).toBe(false)
    expect(onChange).not.toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
