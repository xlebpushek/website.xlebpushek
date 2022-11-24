import { Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserInterface extends Base {
  readonly avatar: string
  readonly avatarId: string
  readonly roles: string[]
  readonly userName: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly password: string
}
