import { createEvent, sample } from 'effector'

import { uploadItemFileFx } from '@entities/items'
import { filesToFormData } from '@shared/utils'


import { FileUploadPayload } from './interfaces'

export const fileUploadSubmitted = createEvent<FileUploadPayload>()

sample({
  clock: fileUploadSubmitted,
  fn: ({ itemId, title, icon, file }) => {
    const formData = filesToFormData([file])
    formData.append('item_id', String(itemId))
    formData.append('icon', icon)
    formData.append('title', title)
    return { itemId, formData }
  },
  target: uploadItemFileFx,
})
