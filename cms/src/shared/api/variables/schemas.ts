import { z } from 'zod'

import { VariableDTO } from './interfaces'

export const variableSchema: z.ZodType<VariableDTO> = z.object({
  id: z.number(),
  name: z.string(),
  value: z.string(),
})

export const variablesSchema = z.array(variableSchema)
