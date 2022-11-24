import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateDto, DeleteAllDto, DeleteDto, Get_idDto, VerificationDto } from './dto/token.dto'
import { TokenModel } from './model/token.model'
import { TokenModule } from './token.module'

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(TokenModel) private readonly tokenModel: ModelType<TokenModule>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateDto) {
    const token = this.jwtService.sign(dto.payload)

    const new_token = new this.tokenModel({
      token: token,
      user_id: dto.user_id,
      expireAt: dto.expireAt,
    })

    return await new_token.save()
  }

  async get_id(dto: Get_idDto) {
    return await this.tokenModel.exists({ token: dto.token, user_id: dto.user_id })
  }

  async verification(dto: VerificationDto) {
    const user__id = this.jwtService.verify(dto.token)
    const token_id = this.get_id({ token: dto.token, user_id: user__id })

    if (!token_id) {
      throw new UnauthorizedException('this token was not found with the user')
    }

    return user__id
  }

  async delete(dto: DeleteDto) {
    await this.verification({ token: dto.token })

    return await this.tokenModel.deleteOne({ token: dto.token, user_id: dto.user_id })
  }

  async deleteAll(dto: DeleteAllDto) {
    const tokens = await this.tokenModel.exists({ user_id: dto.user_id })

    if (!tokens) {
      throw new UnauthorizedException('no tokens found for the user')
    }

    return await this.tokenModel.deleteMany({ user_id: dto.user_id })
  }
}
