import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PayloadDto } from './dto/payload.dto'
@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
      expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN'),
    })
  }

  async validate(payload: PayloadDto) {
    return payload
  }
}
