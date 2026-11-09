import { ItemOption } from '@entities/options/model'

export const sortByPosition = (a: ItemOption, b: ItemOption) =>
  a.position - b.position

// Меняет две карточки местами. Опции между ними остаются на своих местах.
// После обмена позиции нумеруются заново с 1: если у двух опций была одна
// позиция, обмен иначе не меняет чисел — порядок не сохранится, а кнопка
// «Сохранить порядок» не появится.
export const reorderOptions = (
  items: ItemOption[],
  fromId: number,
  toId: number,
): ItemOption[] => {
  const ordered = [...items].sort(sortByPosition)
  const from = ordered.findIndex((item) => item.id === fromId)
  const to = ordered.findIndex((item) => item.id === toId)
  if (from < 0 || to < 0 || from === to) return ordered

  const next = ordered.slice()
  next[from] = ordered[to]
  next[to] = ordered[from]

  return next.map((item, index) => ({ ...item, position: index + 1 }))
}
