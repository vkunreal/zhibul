import { z } from 'zod'

import { UserDTO } from './interfaces'

export const userSchema: z.ZodType<UserDTO> = z.object({
  id: z.number(),
  phone: z.string(),
  name: z.string(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  comment: z.string().nullable(),
  time: z.string().nullable(),
})

export const usersSchema = z.array(userSchema)
