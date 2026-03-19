import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: "User's phone number",
    example: '+79991234567',
  })
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'Password (min 6 characters)',
    example: 'pass123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    description: 'User name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Role names to assign to user',
    example: ['USER'],
    default: ['USER'],
  })
  @IsArray()
  @IsOptional()
  roles?: string[];

  @ApiPropertyOptional({
    description: 'Is user active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
