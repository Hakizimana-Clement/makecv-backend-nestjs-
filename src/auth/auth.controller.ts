import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  singin(@Body() dto: AuthDto) {
    // req.user
    return this.authService.signin(dto);
  }
}
