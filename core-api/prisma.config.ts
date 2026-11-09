import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  // Каталог, не один файл: загружается каждый `.prisma` из `prisma/schema`.
  // `schema.prisma` должен лежать в этом каталоге, не выше, иначе языковой
  // сервер проверяет каждый файл модели отдельно и не видит типы вроде `User`.
  schema: 'prisma/schema',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
