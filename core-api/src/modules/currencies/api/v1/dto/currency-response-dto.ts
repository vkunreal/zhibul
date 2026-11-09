import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'

export class CurrencyResponseDTO {
  @Expose()
  @ApiProperty({ example: '01936a7e-8b2c-7d4e-9f10-123456789abc' })
  id: string

  @Expose()
  @ApiProperty({ example: 'USD', nullable: true })
  title: string | null

  @Expose()
  @ApiProperty({ example: 3.11348 })
  value: number
}

export class CurrencyListResponseDTO {
  @Expose()
  @Type(() => CurrencyResponseDTO)
  @ApiProperty({ type: [CurrencyResponseDTO] })
  items: CurrencyResponseDTO[]

  @Expose()
  @ApiProperty({ example: 6 })
  count: number

  @Expose()
  @ApiProperty({
    nullable: true,
    example: '/api/admin/v1/currencies?page=2&limit=20',
  })
  next: string | null

  @Expose()
  @ApiProperty({
    nullable: true,
    example: '/api/admin/v1/currencies?page=1&limit=20',
  })
  prev: string | null
}
