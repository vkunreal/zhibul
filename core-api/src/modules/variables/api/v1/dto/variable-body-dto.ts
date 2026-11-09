import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

const NAME_MAX_LENGTH = 50
const VALUE_MAX_LENGTH = 100

const trim = ({ value }: { value: unknown }): unknown =>
  typeof value === 'string' ? value.trim() : value

export class VariableBodyDTO {
  @ApiProperty({
    example: 'phone_sales',
    maxLength: NAME_MAX_LENGTH,
    description: 'Key. The same key may appear more than once',
  })
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'Name must be not empty' })
  @MaxLength(NAME_MAX_LENGTH)
  name: string

  @ApiProperty({
    example: '+375 (29) 741-52-26',
    maxLength: VALUE_MAX_LENGTH,
  })
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'Value must be not empty' })
  @MaxLength(VALUE_MAX_LENGTH)
  value: string
}
