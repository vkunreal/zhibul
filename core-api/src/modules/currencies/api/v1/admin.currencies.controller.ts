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
import { CurrenciesService } from '../../application/currencies.service'
import {
  CurrencyListResponseDTO,
  CurrencyResponseDTO,
} from './dto/currency-response-dto'
import { CreateCurrencyDTO } from './dto/create-currency-dto'
import { UpdateCurrencyDTO } from './dto/update-currency-dto'

const currencyResponse = SerializeOptions({
  type: CurrencyResponseDTO,
  excludeExtraneousValues: true,
})

@ApiTags(ApiTag.adminCurrencies)
@Controller('admin/v1/currencies')
@ApiCookieAuth('accessToken')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminCurrenciesControllerV1 {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @SerializeOptions({
    type: CurrencyListResponseDTO,
    excludeExtraneousValues: true,
  })
  @ApiOperation({ summary: 'List currencies' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, type: CurrencyListResponseDTO })
  list(@Query() query: PageQueryDTO, @Req() request: Request) {
    return this.currenciesService.listPage(query, request.originalUrl)
  }

  @Post()
  @currencyResponse
  @ApiOperation({ summary: 'Create a currency' })
  @ApiResponse({ status: 201, type: CurrencyResponseDTO })
  @ApiResponse({ status: 409, description: 'Title is already in use' })
  create(@Body() dto: CreateCurrencyDTO) {
    return this.currenciesService.create(dto)
  }

  @Patch(':id')
  @currencyResponse
  @ApiOperation({ summary: 'Change title or rate' })
  @ApiResponse({ status: 200, type: CurrencyResponseDTO })
  @ApiResponse({ status: 404, description: 'Currency not found' })
  @ApiResponse({ status: 409, description: 'Title is already in use' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,
    @Body() dto: UpdateCurrencyDTO,
  ) {
    return this.currenciesService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a currency' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Currency not found' })
  delete(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string) {
    return this.currenciesService.delete(id)
  }
}
