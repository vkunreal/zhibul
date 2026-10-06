import { ApiProperty } from '@nestjs/swagger'

export class IssuedCodeDTO {
  @ApiProperty({
    description: 'How long the code stays valid, in seconds',
    example: 600,
  })
  ttl!: number

  @ApiProperty({
    description: 'Number of digits in the code',
    example: 6,
  })
  length!: number
}
