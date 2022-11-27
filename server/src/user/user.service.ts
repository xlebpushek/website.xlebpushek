import { BadRequestException, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'
import { TokenService } from 'src/token/token.service'
import { CreateDto } from './dto/create.dto'
import { DeleteDto } from './dto/delete.dto'
import { FindByIdDto } from './dto/find-by-id.dto'
import { FindOneDto } from './dto/find-one.dto'
import { UpdateDto } from './dto/update.dto'
import { UserModel } from './models/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly tokenService: TokenService,
  ) {}

  async findById(dto: FindByIdDto) {
    return await this.userModel.findById({ _id: dto._id })
  }

  async findOne(dto: FindOneDto) {
    return await this.userModel.findOne({ ...dto })
  }

  async create(dto: CreateDto) {
    const old_user_by_user_name_and_id = await this.findOne({ userName: dto.userName, userId: dto.userId })
    if (old_user_by_user_name_and_id) throw new BadRequestException('user with this user name and id already exists')

    const old_user_by_email = await this.findOne({ email: dto.email })
    if (old_user_by_email) throw new BadRequestException('user with this email already exists')

    const salt = await genSalt(10)
    const hashed_password = await hash(dto.password, salt)

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

  async update(dto: UpdateDto) {
    return await this.userModel.findOneAndUpdate({ email: dto.email }, { ...dto.payload }, { new: true })
  }

  async delete(dto: DeleteDto) {
    const old_user = await this.userModel.findByIdAndDelete({ _id: dto._id })
    const old_refresh = await this.tokenService.delete({ user_id: dto._id })

    return {
      user: old_user,
      tokens: {
        refresh: old_refresh,
      },
    }
  }
}
