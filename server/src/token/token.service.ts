import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateDto } from './dto/create.dto'
import { DeleteDto } from './dto/delete.dto'
import { TokenModel } from './model/token.model'

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(TokenModel) private readonly tokenModel: ModelType<TokenModel>,
  ) {}

  async create(dto: CreateDto) {
    const new_access = await this.jwtService.signAsync(
      {
        avatar: dto.avatar,
        avatarId: dto.avatarId,
        roles: dto.roles,
        userName: dto.userName,
        userId: dto.userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      },
    )
    const new_refresh = await this.jwtService.signAsync(
      {
        avatar: dto.avatar,
        avatarId: dto.avatarId,
        roles: dto.roles,
        userName: dto.userName,
        userId: dto.userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
      },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      },
    )

    const save_new_refresh = new this.tokenModel({
      refreshToken: new_refresh,
      user_id: dto.user_id,
    })

    await save_new_refresh.save()

    return {
      access: new_access,
      refresh: new_refresh,
    }
  }

  async delete(dto: DeleteDto) {
    return await this.tokenModel.findOneAndDelete({
      refreshToken: dto.refreshToken,
      user_id: dto.user_id,
    })
  }
}
