import { z } from 'zod'

import { OptionDTO } from './interfaces'

export const optionSchema: z.ZodType<OptionDTO> = z.object({
  id: z.number(),
  item_id: z.number(),
  position: z.number(),
  name: z.string(),
  value: z.string(),
  show_item: z.number().nullable(),
  show_menu: z.number().nullable(),
  is_dropdown: z.number().nullable(),
})

export const optionsSchema = z.array(optionSchema)
