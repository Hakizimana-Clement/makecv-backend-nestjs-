import { Module } from '@nestjs/common';
import { CurriculumVitaeController } from './curriculum-vitae.controller';
import { CurriculumVitaeService } from './curriculum-vitae.service';

@Module({
  controllers: [CurriculumVitaeController],
  providers: [CurriculumVitaeService],
})
export class CurriculumVitaeModule {}
