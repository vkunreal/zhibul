import type { OptionDTO } from '@shared/api'
import { toBool } from '@shared/utils'

import { ItemOption } from '../model'

export const toItemOption = (dto: OptionDTO): ItemOption => ({
  id: dto.id,
  itemId: dto.item_id,
  position: dto.position,
  name: dto.name,
  value: dto.value,
  showItem: toBool(dto.show_item, true),
  showMenu: toBool(dto.show_menu),
  isDropdown: toBool(dto.is_dropdown),
})
