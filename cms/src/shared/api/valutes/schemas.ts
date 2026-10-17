import { z } from 'zod'

import { ValuteDTO } from './interfaces'

export const valuteSchema: z.ZodType<ValuteDTO> = z.object({
  id: z.number(),
  title: z.string().nullable(),
  value: z.number(),
})

export const valutesSchema = z.array(valuteSchema)
