import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'John Doe', nullable: true })
  name?: string;

  @ApiProperty({ example: '+375441234567' })
  phoneNumber: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({
    example: ['USER', 'ADMIN'],
    description: 'User roles',
  })
  roles: string[];
}
