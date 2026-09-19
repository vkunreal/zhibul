import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AuthGuard } from 'src/modules/auth/api/v1/guards/auth.guard'
import { AuthModule } from 'src/modules/auth/auth.module'
import { UsersModule } from 'src/modules/users/users.module'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
  ],
})
export class AppModule {}
