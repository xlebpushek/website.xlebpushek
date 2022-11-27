import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { TokenService } from 'src/token/token.service'
import { RoleEnum } from 'src/user/enums/role.enum'
import { UserService } from 'src/user/user.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignOutDto } from './dto/sign-out.dto'
import { SignUpDto } from './dto/sign-up.dto'

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
    const new_tokens = await this.tokenService.create({
      avatar: dto.avatar,
      avatarId: dto.avatarId,
      roles: [RoleEnum.User],
      userName: dto.userName,
      userId: dto.userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      user_id: new_user._id,
    })

    return {
      user: new_user,
      tokens: new_tokens,
    }
  }

  async signIn(dto: SignInDto) {
    const old_user = await this.userService.findOne({ email: dto.email })
    if (!old_user) throw new BadRequestException('user not found')

    const password_validation = await compare(dto.password, old_user.password)
    if (!password_validation) throw new BadRequestException('password is incorrect')

    const new_tokens = await this.tokenService.create({
      avatar: old_user.avatar,
      avatarId: old_user.avatar,
      roles: old_user.roles,
      userId: old_user.userId,
      userName: old_user.userName,
      firstName: old_user.firstName,
      lastName: old_user.lastName,
      email: old_user.email,
      password: old_user.password,
      user_id: old_user._id,
    })

    return {
      user: old_user,
      tokens: new_tokens,
    }
  }

  async signOut(dto: SignOutDto) {
    if (!dto.refreshToken) throw new UnauthorizedException('token cookies are empty')

    return await this.tokenService.delete({ refreshToken: dto.refreshToken })
  }
}
