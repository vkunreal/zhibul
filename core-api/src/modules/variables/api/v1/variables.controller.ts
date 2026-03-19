import { Controller } from '@nestjs/common'
import { VariablesService } from './variables.service'

@Controller('variables')
export class VariablesControllerV1 {
  constructor(private readonly variablesService: VariablesService) {}
}
