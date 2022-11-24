import { BadRequestException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { CreateDto, FindOneByEmailDto, FindOneByIdDto, PasswordHashingDto } from './dto/user.dto'
import { UserModel } from './models/user.model'

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async findOneById(dto: FindOneByIdDto) {
    return await this.userModel.findById({ _id: dto._id })
  }

  async findOneByEmail(dto: FindOneByEmailDto) {
    return await this.userModel.findOne({ email: dto.email })
  }

  async passwordHashing(dto: PasswordHashingDto) {
    const salt = await genSalt(10)

    return await hash(dto.password, salt)
  }

  async create(dto: CreateDto) {
    const old_user_by_user_id_and_user_name = await this.userModel.findOne({
      userName: dto.userName,
      userId: dto.userId,
    })
    if (old_user_by_user_id_and_user_name) {
      throw new BadRequestException('user with this user name and user id is already exists')
    }

    const old_user_by_email = await this.findOneByEmail({ email: dto.email })
    if (old_user_by_email) {
      throw new BadRequestException('user with this email is already exists')
    }

    const hashed_password = await this.passwordHashing({ password: dto.password })

    const new_user = new this.userModel({
      avatar: dto.avatar,
      avatarId: dto.avatarId,
      roles: dto.roles,
      userName: dto.userName,
      userId: dto.userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashed_password,
    })

    return await new_user.save()
  }
}
