import { ItemOption } from '../model'

import { itemsApi } from './itemsApi'

export const useItem = async (slug: string) => {
  const item = await itemsApi.getItem(slug)
  let options: ItemOption[] = []

  if (item?.id) {
    options = await itemsApi.getItemOptions(item.id)
  }

  return { item, options }
}
