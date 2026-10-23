import { ItemOption } from '@entities/options/model'

import { OptionFormValues } from './ui/OptionFields/interfaces'

export const toOptionForm = (option: ItemOption): OptionFormValues => ({
  name: option.name,
  value: option.value,
  isSelectMenu: option.isDropdown,
  isShowMenu: option.showMenu,
})
