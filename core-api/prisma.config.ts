import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  // Directory, not a single file: every `.prisma` file under `prisma/schema` is loaded.
  // `schema.prisma` must sit in this directory, not above it, or the language
  // server validates each model file alone and cannot see types like `User`.
  schema: 'prisma/schema',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
