import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import type { Request } from 'express'
import { PageQueryDTO } from 'shared/utils/pagination/page-query.dto'
import { ApiTag } from 'src/swagger/api-tags'
import { VariablesService } from '../../application/variables.service'
import { VariableBodyDTO } from './dto/variable-body-dto'
import {
  VariableListResponseDTO,
  VariableResponseDTO,
} from './dto/variable-response-dto'

const variableId = new ParseUUIDPipe({ version: '7' })

const variableResponse = SerializeOptions({
  type: VariableResponseDTO,
  excludeExtraneousValues: true,
})

@ApiTags(ApiTag.adminVariables)
@Controller('admin/v1/variables')
@ApiCookieAuth('accessToken')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminVariablesControllerV1 {
  constructor(private readonly variablesService: VariablesService) {}

  @Get()
  @SerializeOptions({
    type: VariableListResponseDTO,
    excludeExtraneousValues: true,
  })
  @ApiOperation({ summary: 'List variables' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, type: VariableListResponseDTO })
  list(@Query() query: PageQueryDTO, @Req() request: Request) {
    return this.variablesService.listPage(query, request.originalUrl)
  }

  @Post()
  @variableResponse
  @ApiOperation({ summary: 'Create a variable' })
  @ApiResponse({ status: 201, type: VariableResponseDTO })
  create(@Body() dto: VariableBodyDTO) {
    return this.variablesService.create(dto)
  }

  @Patch(':id')
  @variableResponse
  @ApiOperation({ summary: 'Change name and value' })
  @ApiResponse({ status: 200, type: VariableResponseDTO })
  @ApiResponse({ status: 404, description: 'Variable not found' })
  update(@Param('id', variableId) id: string, @Body() dto: VariableBodyDTO) {
    return this.variablesService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a variable' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Variable not found' })
  delete(@Param('id', variableId) id: string) {
    return this.variablesService.delete(id)
  }
}
