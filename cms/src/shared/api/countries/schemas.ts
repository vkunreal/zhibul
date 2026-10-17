import { z } from 'zod'

import { CountryDTO } from './interfaces'

export const countrySchema: z.ZodType<CountryDTO> = z.object({
  id: z.number(),
  name: z.string(),
})

export const countriesSchema = z.array(countrySchema)
