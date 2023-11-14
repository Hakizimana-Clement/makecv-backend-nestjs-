import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';

// @ApiTags('users')
@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  // import AuthService
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  // @ApiHeader({
  //   name: 'authorization',
  //   description: 'Auth token',
  // })
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: AuthDto,
  })
  @ApiForbiddenResponse({
    description: 'Credentials taken',
  })
  singup(@Body() dto: AuthDto) {
    // console.log({ dto });
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiCreatedResponse({
    description: 'User login successfully and receive an access token from jwt',
  })
  @ApiForbiddenResponse({
    description: 'Credentials incorrect, Try again',
  })
  singin(@Body() dto: AuthDto) {
    // req.user
    return this.authService.signin(dto);
  }
}
