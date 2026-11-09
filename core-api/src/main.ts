import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { setupSwagger } from './swagger/setup-swagger'

const defaultCorsOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://zhbl.by',
  'https://www.zhbl.by',
].join(',')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const allowedOrigins = configService
    .get<string>('CORS_ORIGINS', defaultCorsOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  // Нужен конкретный origin: браузер выбрасывает Set-Cookie, когда
  // Access-Control-Allow-Origin равен `*` и при этом включены credentials.
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  })

  app.setGlobalPrefix('api', { exclude: ['healthCheck'] })

  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  )

  setupSwagger(app)

  await app.listen(process.env.PORT ?? 5002)
}

void bootstrap()
