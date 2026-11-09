import { Module } from '@nestjs/common'
import { AdminCurrenciesControllerV1 } from './api/v1/admin.currencies.controller'
import { CurrenciesService } from './application/currencies.service'

@Module({
  controllers: [AdminCurrenciesControllerV1],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
