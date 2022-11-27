import { IsString } from 'class-validator'

export class SignOutDto {
  @IsString()
  readonly refreshToken: string
}
