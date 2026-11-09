import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { EMAIL_EXAMPLE } from 'shared/utils/email/constants'
import { BELARUSIAN_PHONE_EXAMPLE } from 'shared/utils/phone/constants'

export class AdminUserResponseDTO {
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
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  phoneConfirmedAt: Date | null

  @Expose()
  @ApiProperty({ example: EMAIL_EXAMPLE, nullable: true })
  email: string | null

  @Expose()
  @ApiProperty({ example: 'new@example.com', nullable: true })
  pendingEmail: string | null

  @Expose()
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  emailConfirmedAt: Date | null

  @Expose()
  @ApiProperty({
    example: true,
    description: 'false means the account is blocked',
  })
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

export class UserListResponseDTO {
  @Expose()
  @Type(() => AdminUserResponseDTO)
  @ApiProperty({ type: [AdminUserResponseDTO] })
  items: AdminUserResponseDTO[]

  @Expose()
  @ApiProperty({ example: 42 })
  count: number

  @Expose()
  @ApiProperty({
    nullable: true,
    example: '/api/admin/v1/users?page=2&limit=20',
  })
  next: string | null

  @Expose()
  @ApiProperty({
    nullable: true,
    example: '/api/admin/v1/users?page=1&limit=20',
  })
  prev: string | null
}
