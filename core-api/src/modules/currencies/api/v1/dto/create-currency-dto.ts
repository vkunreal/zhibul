import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator'

const TITLE_MAX_LENGTH = 15

const trim = ({ value }: { value: unknown }): unknown =>
  typeof value === 'string' ? value.trim() : value

export class CreateCurrencyDTO {
  @ApiProperty({ example: 'USD', maxLength: TITLE_MAX_LENGTH })
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'Title must be not empty' })
  @MaxLength(TITLE_MAX_LENGTH)
  title: string

  @ApiProperty({
    example: 3.11348,
    description: 'How many BYN one unit of this currency costs',
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  value: number
}
