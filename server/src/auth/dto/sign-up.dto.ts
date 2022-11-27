import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  readonly avatar: string

  readonly avatarId: string

  readonly roles: string[]

  @IsString()
  readonly userName: string

  @IsNumber()
  readonly userId: number

  @IsString()
  readonly firstName: string

  @IsString()
  readonly lastName: string

  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(9, {
    message: 'password must be at least 9 characters',
  })
  readonly password: string
}
