import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypegooseModule } from 'nestjs-typegoose'
import { getJwtConfig } from 'src/config/jwt.config'
import { getPassportConfig } from 'src/config/passport.config'
import { TokenModel } from './model/token.model'
import { AccessStrategy } from './strategies/access.strategy'
import { RefreshStrategy } from './strategies/refresh.strategy'
import { TokenService } from './token.service'

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPassportConfig,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    TypegooseModule.forFeature([
      {
        typegooseClass: TokenModel,
        schemaOptions: {
          collection: 'Tokens',
        },
      },
    ]),
  ],
  providers: [TokenService, AccessStrategy, RefreshStrategy],
  exports: [TokenService],
})
export class TokenModule {}
