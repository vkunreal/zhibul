import { z } from 'zod'

import { LoginResponseDTO } from './interfaces'

export const loginResponseSchema: z.ZodType<LoginResponseDTO> = z.object({
  token: z.string(),
})
