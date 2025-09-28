import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { exampleUser } from '../example-user'

export class AuthUserDTO {
  @IsNotEmpty({ message: "User's phone number must be not empty" })
  @IsPhoneNumber()
  @ApiProperty({
    description: exampleUser.phoneNumber.description,
    example: exampleUser.phoneNumber.value,
    nullable: false,
  })
  phoneNumber: string

  @IsNotEmpty({ message: "User's password must be not empty" })
  @IsString({ message: "User's password must be a string" })
  @MinLength(8)
  @ApiProperty({
    description: exampleUser.password.description,
    example: exampleUser.password.value,
    nullable: false,
  })
  password: string
}
