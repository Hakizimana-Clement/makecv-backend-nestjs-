import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CurriculumVitaeModule } from './curriculum-vitae/curriculum-vitae.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, CurriculumVitaeModule, PrismaModule],
})
export class AppModule {}
