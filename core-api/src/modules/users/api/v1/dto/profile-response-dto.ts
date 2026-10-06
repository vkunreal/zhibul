import { ApiProperty } from '@nestjs/swagger'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone'

export class ProfileResponseDTO {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string

  @ApiProperty({ example: 'John', nullable: true })
  firstName: string | null

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName: string | null

  @ApiProperty({ example: BELARUSIAN_PHONE_EXAMPLE })
  phoneNumber: string

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    nullable: true,
    description: 'When the phone number was last proven by an OTP',
  })
  phoneConfirmedAt: Date | null

  @ApiProperty({
    example: 'john@example.com',
    nullable: true,
    description: 'Confirmed email, the fallback channel for access recovery',
  })
  email: string | null

  @ApiProperty({
    example: 'new@example.com',
    nullable: true,
    description: 'Email awaiting confirmation',
  })
  pendingEmail: string | null

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  emailConfirmedAt: Date | null

  @ApiProperty({ example: true })
  isActive: boolean

  @ApiProperty({ example: ['USER'] })
  roles: string[]

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date
}
