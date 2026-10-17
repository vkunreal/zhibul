import { z } from 'zod'

import { CandidateDTO } from './interfaces'

export const candidateSchema: z.ZodType<CandidateDTO> = z.object({
  id: z.number(),
  phone: z.string().nullable(),
  name: z.string().nullable(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  comment: z.string().nullable(),
})

export const candidatesSchema = z.array(candidateSchema)
