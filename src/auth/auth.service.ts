import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
      });
      // return user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signin(dto) {
    // find the user
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user doesn't exist
    if (!user) throw new ForbiddenException('Credentials incorrect');
    // compare passwor
    const PwMatches = await argon.verify(user.hash, dto.password);
    if (!PwMatches) throw new ForbiddenException('Credentials incorrect');

    // return user
    // console.log(user.id, user.email);
    // console.log(user.id);
    // console.log(typeof parseInt(user.id));
    // console.log(parseInt(user.id));

    // return this.signToken(parseInt(user.id), user.email);

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
