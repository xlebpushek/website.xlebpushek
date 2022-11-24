import { Controller, Post } from '@nestjs/common'

@Controller('hello')
export class AppController {
  @Post()
  async hello() {
    return 'Hello'
  }
}
