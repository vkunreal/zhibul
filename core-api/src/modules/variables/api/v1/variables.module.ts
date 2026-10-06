import { Module } from '@nestjs/common'
import { VariablesControllerV1 } from './variables.controller'
import { VariablesService } from './variables.service'

@Module({
  controllers: [VariablesControllerV1],
  providers: [VariablesService],
})
export class VariablesModule {}
