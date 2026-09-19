import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class AuthUserDTO {
  @IsNotEmpty({ message: "User's phone number must be not empty" })
  @IsPhoneNumber()
  @ApiProperty({
    description: "User's phone number",
    example: '+375447861303',
    nullable: false,
  })
  phoneNumber!: string

  @IsNotEmpty({ message: "User's password must be not empty" })
  @IsString({ message: "User's password must be a string" })
  @MinLength(8, {
    message: "User's password must be at least 8 characters long",
  })
  @MaxLength(32, {
    message: "User's password must be at most 32 characters long",
  })
  @ApiProperty({
    description: "User's password",
    example: 'pass12341234',
    nullable: false,
  })
  password!: string
}
