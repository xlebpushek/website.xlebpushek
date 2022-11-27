import { Body, Controller, HttpCode, Post, Req, Res, ValidationPipe } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  async signUp(@Body(new ValidationPipe()) dto: SignUpDto, @Res() res: Response) {
    const data = await this.authService.signUp(dto)
    res.cookie('refresh-token', data.tokens.refresh, {
      maxAge: 43200000,
      httpOnly: true,
    })

    return res.json(data)
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body(new ValidationPipe()) dto: SignInDto, @Res() res: Response) {
    const data = await this.authService.signIn(dto)
    res.cookie('refresh-token', data.tokens.refresh, {
      maxAge: 43200000,
      httpOnly: true,
    })

    return res.json(data)
  }

  @Post('signout')
  @HttpCode(200)
  async signOut(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.signOut({ refreshToken: req.cookies['refresh-token'] })
    res.clearCookie('refresh-token')

    return res.json(data)
  }
}
