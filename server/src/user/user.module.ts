import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TokenModule } from 'src/token/token.module'
import { UserModel } from './models/user.model'
import { UserService } from './user.service'
import { UserController } from './user.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'Users',
        },
      },
    ]),
    TokenModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
