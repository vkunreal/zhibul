import { Module } from '@nestjs/common'
import { AdminVariablesControllerV1 } from './api/v1/admin.variables.controller'
import { UnauthVariablesControllerV1 } from './api/v1/unauth.variables.controller'
import { VariablesService } from './application/variables.service'

@Module({
  controllers: [UnauthVariablesControllerV1, AdminVariablesControllerV1],
  providers: [VariablesService],
})
export class VariablesModule {}
