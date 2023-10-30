import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'mongodb://127.0.0.1:27020/curriculumVitaeDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1',
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
