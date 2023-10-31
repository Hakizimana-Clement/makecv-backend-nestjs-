import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { GetUser } from 'src/auth/decorator';
// import { JwtGuard } from 'src/auth/guard';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('id') id: string) {
    console.log({ id });

    return user;
  }

  @Patch()
  editUser() {}
}
