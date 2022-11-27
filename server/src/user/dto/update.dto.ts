import { IsEmail, IsNumber, IsString } from 'class-validator'

class Payload {
  avatar?: string

  avatarId?: string

  roles?: string[]

  @IsString()
  userName?: string

  @IsNumber()
  userId?: number

  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsEmail()
  readonly email?: string

  @IsString()
  password?: string
}

export class UpdateDto {
  @IsEmail()
  readonly email: string

  readonly payload: Payload
}
