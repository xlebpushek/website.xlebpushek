import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { RoleEnum } from '../enums/role.enum'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  readonly avatar: string

  readonly avatarId: string

  @prop({ required: true, type: [String], enum: Object.values(RoleEnum) })
  readonly roles: string[]

  @prop({ required: true })
  readonly userName: string

  @prop({ required: true, min: 1, max: 9999 })
  readonly userId: number

  @prop({ required: true })
  readonly firstName: string

  @prop({ required: true })
  readonly lastName: string

  @prop({ required: true, unique: true })
  readonly email: string

  @prop({ required: true, minlength: 9 })
  readonly password: string
}
