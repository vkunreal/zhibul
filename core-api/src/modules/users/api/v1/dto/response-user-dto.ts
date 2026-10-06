import { ApiProperty } from '@nestjs/swagger'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'

export class UserResponseDTO {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string

  @ApiProperty({ example: 'John', nullable: true })
  firstName?: string

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName?: string

  @ApiProperty({ example: BELARUSIAN_PHONE_EXAMPLE })
  phoneNumber: string

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  phoneConfirmedAt?: Date

  @ApiProperty({ example: 'john@example.com', nullable: true })
  email?: string

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  emailConfirmedAt?: Date

  @ApiProperty({ example: true })
  isActive: boolean

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date

  @ApiProperty({
    example: ['USER', 'ADMIN'],
    description: 'User roles',
  })
  roles: string[]
}
