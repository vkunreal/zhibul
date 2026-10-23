import { AddOptionMenu } from '@features/add-option'
import { AddNewsItem } from '@features/create-news'
import { CategoryMenu } from '@features/save-category'
import { ItemMenu } from '@features/save-item'
import { AddPageMenu } from '@features/save-page'
import { ChangeVariableMenu } from '@features/save-variable'
import { FileModal } from '@features/upload-item-file'
import { ValuteMenu } from '@views/Valutes/ValuteMenu'

import { ModalRegistry } from './interfaces'

export const DEFAULT_MODAL_STATE = { name: null, props: null }

export const MODAL_REGISTRY = {
  itemModal: ItemMenu,
  categoryModal: CategoryMenu,
  optionModal: AddOptionMenu,
  variableModal: ChangeVariableMenu,
  fileModal: FileModal,
  pageModal: AddPageMenu,
  newsModal: AddNewsItem,
  valuteModal: ValuteMenu,
} satisfies ModalRegistry

// Должно совпадать с длительностью fade-out в твоей модалке
export const EXIT_MS = 300
