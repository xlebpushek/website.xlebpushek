import { IsDateString, IsString } from 'class-validator'
import { Types } from 'mongoose'
import { CreateDto as CreateUserDto } from 'src/user/dto/user.dto'

export class CreateDto {
  @IsString()
  payload: CreateUserDto

  @IsString()
  user_id: Types.ObjectId

  @IsDateString()
  expireAt: string
}

export class Get_idDto {
  @IsString()
  token: string

  @IsString()
  user_id: Types.ObjectId
}

export class VerificationDto {
  @IsString()
  token: string
}

export class DeleteDto {
  @IsString()
  token: string

  @IsString()
  user_id: Types.ObjectId
}

export class DeleteAllDto {
  @IsString()
  user_id: Types.ObjectId
}
