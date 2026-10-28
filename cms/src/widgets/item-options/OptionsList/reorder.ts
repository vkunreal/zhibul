import { ItemOption } from '@entities/options/model'

export const sortByPosition = (a: ItemOption, b: ItemOption) =>
  a.position - b.position

// Переносит карточку на место цели и заново нумерует позиции с 1.
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
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)

  return next.map((item, index) => ({ ...item, position: index + 1 }))
}
