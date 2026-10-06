// Раскладывает строку кода по клеткам фиксированной длины.
// Недостающие места заполняются пробелами, чтобы индекс клетки не сдвигался.
// getCells('12', 6) => ['1', '2', ' ', ' ', ' ', ' ']
// getCells('1234567', 6) => ['1', '2', '3', '4', '5', '6']
export const getCells = (value: string, length: number) => {
  return value.padEnd(length).slice(0, length).split('')
}

// Кладёт цифры из входящей строки в клетки, начиная с index.
export const placeDigits = (
  current: string,
  incoming: string,
  index: number,
  length: number,
) => {
  const cells = getCells(current, length)
  // Буквы, пробелы и знаки из вставки отбрасываются.
  const digits = incoming.replace(/\D/g, '')

  // Каждая следующая цифра занимает следующую клетку. Хвост длиннее кода игнорируется.
  digits.split('').forEach((digit, offset) => {
    const i = index + offset

    if (i < length) cells[i] = digit
  })

  return { cells, digits }
}

// Вставляет пачку цифр и переводит фокус на последнюю из них.
export const writeDigits = (
  current: string,
  incoming: string,
  index: number,
  length: number,
  focusDigit: (index: number) => void,
) => {
  const { cells, digits } = placeDigits(current, incoming, index, length)
  // Индекс последней записанной клетки, а не следующей пустой.
  const lastIndex = Math.min(index + digits.length, length) - 1

  if (digits && lastIndex >= 0) focusDigit(lastIndex)

  return cells.join('')
}
