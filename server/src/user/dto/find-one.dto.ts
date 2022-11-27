import { IsEmail, IsNumber, IsString } from 'class-validator'

export class FindOneDto {
  readonly avatar?: string

  readonly avatarId?: string

  readonly roles?: string[]

  @IsString()
  readonly userName?: string

  @IsNumber()
  readonly userId?: number

  @IsString()
  readonly firstName?: string

  @IsString()
  readonly lastName?: string

  @IsEmail()
  readonly email?: string

  @IsString()
  readonly password?: string
}
