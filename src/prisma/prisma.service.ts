import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          // url: 'mongodb://127.0.0.1:27017/curriculumVitaeDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1',

          url: 'mongodb://127.0.0.1:27020/curriculumVitaeDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1',
        },
      },
    });
  }
}
