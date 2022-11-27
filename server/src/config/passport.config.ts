import { ConfigService } from '@nestjs/config'
import { AuthModuleOptions } from '@nestjs/passport'

export async function getPassportConfig(configService: ConfigService): Promise<AuthModuleOptions> {
  return { defaultStrategy: 'access' }
}
