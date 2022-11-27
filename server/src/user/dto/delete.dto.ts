import { IsEmail } from 'class-validator'
import { Types } from 'mongoose'

export class DeleteDto {
  @IsEmail()
  readonly _id: Types.ObjectId
}
