import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PayloadDto } from './dto/payload.dto'
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET_KEY'),
      expiresIn: configService.get('JWT_REFRESH_EXPIRES_IN'),
    })
  }

  async validate(req: any, payload: PayloadDto) {
    const refresh_token = req.get('Authorization').replace('Bearer', '').trim()

    if (!refresh_token) {
      throw new UnauthorizedException('token not found')
    }

    return {
      payload,
      refreshToken: refresh_token,
    }
  }
}
