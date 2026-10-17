import { z } from 'zod'

import { ItemFileDTO, UploadItemFileResponseDTO } from './interfaces'

export const itemFileSchema: z.ZodType<ItemFileDTO> = z.object({
  item_id: z.number(),
  src: z.string(),
  title: z.string(),
  icon: z.string(),
})

export const itemFilesSchema = z.array(itemFileSchema)

export const uploadItemFileResponseSchema: z.ZodType<UploadItemFileResponseDTO> =
  z.object({
    status: z.boolean(),
    response: z.object({
      item_id: z.string(),
      fileUrl: z.string(),
      title: z.string(),
      icon: z.string(),
    }),
  })
