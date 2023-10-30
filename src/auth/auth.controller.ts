import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  // import AuthService
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  singup(@Body() dto: AuthDto) {
    // console.log({ dto });

    return this.authService.signup(dto);
  }

  @Post('signin')
  singin() {
    return this.authService.signin();
  }
}
