import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common'
import { CreateDto as SignUpDto } from 'src/user/dto/user.dto'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  async signUp(@Body(new ValidationPipe()) dto: SignUpDto) {
    return this.authService.signUp(dto)
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body(new ValidationPipe()) dto: SignInDto) {
    return this.authService.signIn(dto)
  }
}
