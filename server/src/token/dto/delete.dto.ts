import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class DeleteDto {
  @IsString()
  refreshToken?: string

  @IsString()
  readonly user_id?: Types.ObjectId
}
