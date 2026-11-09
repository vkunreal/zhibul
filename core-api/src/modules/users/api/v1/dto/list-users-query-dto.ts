import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator'
import { PageQueryDTO } from 'shared/utils/pagination/page-query.dto'

const trim = ({ value }: { value: unknown }): unknown =>
  typeof value === 'string' ? value.trim() : value

const toOptionalBoolean = ({ value }: { value: unknown }): unknown => {
  if (value === true || value === 'true') return true
  if (value === false || value === 'false') return false
  return value
}

export class ListUsersQueryDTO extends PageQueryDTO {
  @ApiPropertyOptional({
    description: 'Matches phone, email, first name, or last name',
  })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(100)
  search?: string

  @ApiPropertyOptional({
    description: 'true — active accounts, false — blocked',
  })
  @IsOptional()
  @Transform(toOptionalBoolean)
  @IsBoolean()
  isActive?: boolean
}
