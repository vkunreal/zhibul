import { DragEvent } from 'react'

import { ItemOption } from '@entities/options/model'

export type OptionDragEvent = DragEvent<HTMLDivElement>

export interface OptionElemProps {
  id?: string
  itemId: number
  option: ItemOption
  isDragging: boolean
  isOver: boolean
  onDragStart: (event: OptionDragEvent, option: ItemOption) => void
  onDragEnd: () => void
  onDragOver: (event: OptionDragEvent, option: ItemOption) => void
  onDrop: (event: OptionDragEvent, option: ItemOption) => void
}
