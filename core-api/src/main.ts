import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const defaultCorsOrigins = [
  'http://localhost:3000',
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

  // A concrete origin is required: browsers drop Set-Cookie when
  // Access-Control-Allow-Origin is `*` together with credentials.
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

  const config = new DocumentBuilder()
    .setTitle('Core')
    .setDescription('Service works with authorization, payments, orders')
    .setVersion('1.0.0')
    .addTag('core')
    .addCookieAuth('accessToken')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 5002)
}

bootstrap()
