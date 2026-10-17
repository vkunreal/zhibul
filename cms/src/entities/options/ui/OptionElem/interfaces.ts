import { DragEvent } from 'react'

import { ItemOption } from '@entities/options/model'

export type OptionDragEvent = DragEvent<HTMLDivElement>

export interface OptionElemProps {
  id?: string
  itemId: number
  option: ItemOption
  onDragStart: (event: OptionDragEvent, option: ItemOption) => void
  onDragLeave: (event: OptionDragEvent) => void
  onDragOver: (event: OptionDragEvent) => void
  onDrop: (event: OptionDragEvent, option: ItemOption) => void
}
