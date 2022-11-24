import { Prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import { UserModel } from 'src/user/models/user.model'

export interface TokenModel extends Base {}

export class TokenModel extends TimeStamps {
  @Prop({ required: true })
  token: string

  @Prop({ required: true, ref: () => UserModel })
  user_id: Types.ObjectId

  @Prop({ required: true })
  expireAt: Date
}
