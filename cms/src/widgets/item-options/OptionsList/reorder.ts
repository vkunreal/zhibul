import { ItemOption } from '@entities/options/model'

export const sortByPosition = (a: ItemOption, b: ItemOption) =>
  a.position - b.position

// Меняет две карточки местами. Опции между ними остаются на своих позициях.
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
  const source = next[from]
  const target = next[to]
  next[from] = { ...target, position: source.position }
  next[to] = { ...source, position: target.position }

  return next
}
