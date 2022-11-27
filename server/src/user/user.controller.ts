import { Controller, Param, Patch } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Patch('delete:id')
  async delete(@Param('id') id: string) {}
}
