import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants'

export class PageQueryDTO {
  @ApiPropertyOptional({ default: DEFAULT_PAGE, minimum: DEFAULT_PAGE })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(DEFAULT_PAGE)
  page?: number

  @ApiPropertyOptional({ default: DEFAULT_LIMIT, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number
}
