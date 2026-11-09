import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiTag } from 'src/swagger/api-tags'
import { VariablesService } from '../../application/variables.service'
import { VariableResponseDTO } from './dto/variable-response-dto'

const variableResponse = SerializeOptions({
  type: VariableResponseDTO,
  excludeExtraneousValues: true,
})

@ApiTags(ApiTag.unauthVariables)
@Controller('unauth/v1/variables')
@UseInterceptors(ClassSerializerInterceptor)
export class UnauthVariablesControllerV1 {
  constructor(private readonly variablesService: VariablesService) {}

  @Get()
  @variableResponse
  @ApiOperation({ summary: 'Site variables' })
  @ApiResponse({ status: 200, type: [VariableResponseDTO] })
  list() {
    return this.variablesService.list()
  }
}
