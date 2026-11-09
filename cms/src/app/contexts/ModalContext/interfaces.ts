import { ComponentType } from 'react'

import { AddOptionMenuProps } from '@features/add-option/interfaces'
import { AddNewsItemProps } from '@features/create-news/interfaces'
import { CategoryMenuProps } from '@features/save-category/interfaces'
import { ItemMenuProps } from '@features/save-item/interfaces'
import { AddPageMenuProps } from '@features/save-page/interfaces'
import { ChangeVariableMenuProps } from '@features/save-variable/interfaces'
import { FileModalProps } from '@features/upload-item-file/interfaces'
import { ValuteMenuProps } from '@views/Valutes/interfaces'

export type ModalMap = {
  itemModal: ItemMenuProps
  categoryModal: CategoryMenuProps
  optionModal: AddOptionMenuProps
  variableModal: ChangeVariableMenuProps
  fileModal: FileModalProps
  pageModal: AddPageMenuProps
  newsModal: AddNewsItemProps
  valuteModal: ValuteMenuProps
}

export type ModalName = keyof ModalMap

export type ModalRegistry = {
  [N in ModalName]: ComponentType<ModalMap[N]>
}

export type ModalPayload<N extends ModalName> = Omit<
  ModalMap[N],
  'isOpen' | 'onClose'
>

export type MountedModalState =
  | { name: null; props: null }
  | { [N in ModalName]: { name: N; props: ModalPayload<N> } }[ModalName]

export type Ctx = {
  isOpen: boolean
  open: <N extends ModalName>(name: N, props: ModalPayload<N>) => void
  close: () => void
} | null
