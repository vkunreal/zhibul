import { createEffect, createStore, sample } from 'effector'

import {
  deleteItemFile,
  deleteItemFiles,
  getItemFiles,
  uploadItemFile,
} from '@shared/api'

import { ItemFile } from '../model'
import { toItemFile } from '../utils/mappers'

import { ItemAsset, ItemUpload } from './interfaces'

export const getItemFilesFx = createEffect(getItemFiles)
export const uploadItemFileFx = createEffect(({ formData }: ItemUpload) =>
  uploadItemFile(formData),
)
export const deleteItemFileFx = createEffect(({ src }: ItemAsset) =>
  deleteItemFile({ src }),
)
export const deleteItemFilesFx = createEffect(async (itemId: number) => {
  await deleteItemFiles(itemId)
  return itemId
})

export const $itemFiles = createStore<ItemFile[]>([]).on(
  getItemFilesFx.doneData,
  (_, files) => files.map(toItemFile),
)

sample({
  clock: [uploadItemFileFx.done, deleteItemFileFx.done],
  fn: ({ params }) => params.itemId,
  target: getItemFilesFx,
})

sample({
  clock: deleteItemFilesFx.doneData,
  target: getItemFilesFx,
})
