import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export async function getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get('JWT_ACCESS_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN'),
    },
  }
}
