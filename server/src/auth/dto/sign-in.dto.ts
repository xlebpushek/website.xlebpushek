import { IsEmail, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(9, {
    message: 'password must be at least 9 characters',
  })
  readonly password: string
}
