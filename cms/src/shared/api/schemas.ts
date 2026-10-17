import { z } from 'zod'

import { StatusResponseDTO } from './interfaces'

export const statusResponseSchema: z.ZodType<StatusResponseDTO> = z.object({
  status: z.boolean(),
})
