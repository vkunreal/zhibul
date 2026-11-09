import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'

export class VariableResponseDTO {
  @Expose()
  @ApiProperty({ example: '01936a7e-8b2c-7d4e-9f10-123456789abc' })
  id: string

  @Expose()
  @ApiProperty({ example: 'phone_sales' })
  name: string

  @Expose()
  @ApiProperty({ example: '+375 (29) 741-52-26' })
  value: string
}

export class VariableListResponseDTO {
  @Expose()
  @Type(() => VariableResponseDTO)
  @ApiProperty({ type: [VariableResponseDTO] })
  items: VariableResponseDTO[]

  @Expose()
  @ApiProperty({ example: 15 })
  count: number

  @Expose()
  @ApiProperty({
    nullable: true,
    example: '/api/admin/v1/variables?page=2&limit=20',
  })
  next: string | null

  @Expose()
  @ApiProperty({
    nullable: true,
    example: '/api/admin/v1/variables?page=1&limit=20',
  })
  prev: string | null
}
