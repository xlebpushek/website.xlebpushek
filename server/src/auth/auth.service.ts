import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { TokenService } from 'src/token/token.service'
import { RoleEnum } from 'src/user/enums/role.enum'
import { UserService } from 'src/user/user.service'
import { SignInDto, SignUpDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  async signUp(dto: SignUpDto) {
    const new_user = await this.userService.create({
      avatar: dto.avatar,
      avatarId: dto.avatarId,
      roles: [RoleEnum.User],
      userName: dto.userName,
      userId: dto.userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
    })

    const new_token = await this.tokenService.create({
      payload: dto,
      user_id: new_user._id,
      expireAt: moment().add(1, 'day').toISOString(),
    })

    return {
      user: new_user,
      token: new_token,
    }
  }

  async signIn(dto: SignInDto) {}
}
