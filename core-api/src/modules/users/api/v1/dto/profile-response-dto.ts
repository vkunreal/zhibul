import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone/constants'

export class ProfileResponseDTO {
  @Expose()
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string

  @Expose()
  @ApiProperty({ example: 'John', nullable: true })
  firstName: string | null

  @Expose()
  @ApiProperty({ example: 'Doe', nullable: true })
  lastName: string | null

  @Expose()
  @ApiProperty({ example: BELARUSIAN_PHONE_EXAMPLE })
  phoneNumber: string

  @Expose()
  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    nullable: true,
    description: 'When the phone number was last proven by an OTP',
  })
  phoneConfirmedAt: Date | null

  @Expose()
  @ApiProperty({
    example: 'john@example.com',
    nullable: true,
    description: 'Confirmed email, the fallback channel for access recovery',
  })
  email: string | null

  @Expose()
  @ApiProperty({
    example: 'new@example.com',
    nullable: true,
    description: 'Email awaiting confirmation',
  })
  pendingEmail: string | null

  @Expose()
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  emailConfirmedAt: Date | null

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean

  @Expose()
  @ApiProperty({ example: ['USER'] })
  roles: string[]

  @Expose()
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date

  @Expose()
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date
}
