import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TokenService } from 'src/token/token.service'
import { UserInterface } from 'src/user/interfaces/user.interface'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService, private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    })
  }

  async validate(req: any, user: UserInterface) {
    const token = req.headers.authorization.slice(7)
    const token__id = await this.tokenService.get_id({ user_id: user._id, token: token })

    if (!token__id) {
      throw new UnauthorizedException('Token does not exist!')
    }

    return user
  }
}
