import { writeDigits } from './cells'

// Обычный ввод в одну клетку. Несколько символов сразу обрабатываются как вставка.
export const handleDigitChange = (
  raw: string,
  current: string,
  cells: string[],
  index: number,
  length: number,
  onChange: (value: string) => void,
  focusDigit: (index: number) => void,
) => {
  // Автозаполнение или вставка приходят в onChange одной строкой длиннее одной цифры.
  if (raw.replace(/\D/g, '').length > 1) {
    onChange(writeDigits(current, raw, index, length, focusDigit))
    return
  }

  // Берём последнюю цифру: браузер дописывает её к значению, которое уже стоит в поле.
  const digit = raw.replace(/\D/g, '').slice(-1)
  const updated = cells.slice()

  // Нет цифры — клетка очищается. Есть цифра — фокус уходит на следующую, кроме последней.
  updated[index] = digit || ' '
  onChange(updated.join(''))

  if (digit && index < length - 1) focusDigit(index + 1)
}

// Вставка из буфера идёт тем же путём, что и набор нескольких цифр.
export const handleDigitPaste = (
  text: string,
  current: string,
  index: number,
  length: number,
  onChange: (value: string) => void,
  focusDigit: (index: number) => void,
) => {
  onChange(writeDigits(current, text, index, length, focusDigit))
}

// Клавиши, которые не должны попасть в поле как текст.
// true значит, что клавиша обработана: снаружи для неё вызывается preventDefault.
export const handleDigitKey = (
  key: string,
  cells: string[],
  index: number,
  length: number,
  onChange: (value: string) => void,
  focusDigit: (index: number) => void,
  onSubmit: () => void,
) => {
  if (key === 'Backspace') {
    const updated = cells.slice()

    // В заполненной клетке стираем только её и остаёмся на месте.
    if (cells[index].trim()) {
      updated[index] = ' '
      onChange(updated.join(''))
      return true
    }

    // В пустой стираем предыдущую и переводим туда фокус.
    if (index > 0) {
      updated[index - 1] = ' '
      onChange(updated.join(''))
      focusDigit(index - 1)
    }

    return true
  }

  // Стрелки только двигают фокус, значение кода не меняют.
  if (key === 'ArrowLeft' && index > 0) {
    focusDigit(index - 1)
    return true
  }

  if (key === 'ArrowRight' && index !== length - 1) {
    focusDigit(index + 1)
    return true
  }

  // Enter отправляет форму. preventDefault снаружи не даёт ей уйти вторым разом.
  if (key === 'Enter') {
    onSubmit()
    return true
  }

  return false
}
