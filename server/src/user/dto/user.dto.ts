import { IsEmail, IsNumber, IsString, Max, Min, MinLength } from 'class-validator'
import { Types } from 'mongoose'

export class FindOneByIdDto {
  @IsString()
  readonly _id: Types.ObjectId
}

export class FindOneByEmailDto {
  @IsEmail()
  readonly email: string
}

export class PasswordHashingDto {
  @IsString()
  @MinLength(9, { message: 'password cannot be less than 9 characters' })
  readonly password: string
}

export class CreateDto {
  @IsString()
  readonly avatar: string

  @IsString()
  readonly avatarId: string

  readonly roles: string[]

  @IsString()
  readonly userName: string

  @IsNumber()
  @Min(1, { message: 'user id cannot be less than 1 character' })
  @Max(9999, { message: 'user id cannot be greater than 9999' })
  readonly userId: number

  @IsString()
  readonly firstName: string

  @IsString()
  readonly lastName: string

  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(9, { message: 'password cannot be less than 9 characters' })
  readonly password: string
}
