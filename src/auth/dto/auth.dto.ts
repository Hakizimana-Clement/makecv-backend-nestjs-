import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'johnAdam@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The name of the password',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
