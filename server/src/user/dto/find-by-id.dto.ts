import { IsString } from 'class-validator'

export class FindByIdDto {
  @IsString()
  readonly _id: string
}
