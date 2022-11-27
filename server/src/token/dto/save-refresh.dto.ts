import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class SaveRefreshDto {
  @IsString()
  readonly refreshToken: string

  @IsString()
  readonly user_id: Types.ObjectId
}
