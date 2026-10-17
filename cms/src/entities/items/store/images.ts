import { createEffect, createStore, sample } from 'effector'

import {
  deleteItemImage,
  getItemImages,
  setMainItemImage,
  uploadItemImages,
} from '@shared/api'

import { ItemImage } from '../model'
import { toItemImage } from '../utils/mappers'

import { ItemAsset, ItemUpload } from './interfaces'

export const getItemImagesFx = createEffect(getItemImages)
export const uploadItemImagesFx = createEffect(
  ({ itemId, formData }: ItemUpload) => uploadItemImages(itemId, formData),
)
export const setMainItemImageFx = createEffect(({ src }: ItemAsset) =>
  setMainItemImage({ src }),
)
export const deleteItemImageFx = createEffect(({ src }: ItemAsset) =>
  deleteItemImage({ src }),
)

export const $itemImages = createStore<ItemImage[]>([]).on(
  getItemImagesFx.doneData,
  (_, images) => images.map(toItemImage),
)

sample({
  clock: [
    uploadItemImagesFx.done,
    setMainItemImageFx.done,
    deleteItemImageFx.done,
  ],
  fn: ({ params }) => params.itemId,
  target: getItemImagesFx,
})
