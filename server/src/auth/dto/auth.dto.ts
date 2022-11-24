import { IsEmail, IsString, MinLength } from 'class-validator'
import { CreateDto as CreateUserDto } from 'src/user/dto/user.dto'

export class SignUpDto extends CreateUserDto {}

export class SignInDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(9, { message: 'Password cannot be less than 9 characters' })
  password: string
}
