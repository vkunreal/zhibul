import { z } from 'zod'

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '')

const envSchema = z.object({
  VITE_API_URL: z.url({ protocol: /^https?$/ }).transform(trimTrailingSlash),
  VITE_SITE_URL: z.url({ protocol: /^https?$/ }).transform(trimTrailingSlash),
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  throw new Error(
    `Переменные окружения CMS заданы неверно, сверьтесь с cms/.env.example:\n${z.prettifyError(parsedEnv.error)}`,
  )
}

export const env = {
  apiUrl: parsedEnv.data.VITE_API_URL,
  siteUrl: parsedEnv.data.VITE_SITE_URL,
}
