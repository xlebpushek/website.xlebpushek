import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export async function getMongoDBConfig(configService: ConfigService): Promise<TypegooseModuleOptions> {
  return { uri: configService.get('MONGODB_URI') }
}
