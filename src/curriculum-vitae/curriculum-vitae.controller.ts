import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { JwtGuard } from '../../src/auth/guard';
// import { CurriculumVitaeService } from './curriculum-vitae.service';
// import { JwtGuard } from 'src/auth/guard';
// import { GetUser } from '../../src/auth/decorator';
// import { GetUser } from 'src/auth/decorator';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateCurriculumVitaeDto, EditCurriculumVitaeDto } from './dto';

@UseGuards(JwtGuard)
@Controller('curriculum-vitaes')
export class CurriculumVitaeController {
  constructor(private curriculumVitaeService: CurriculumVitaeService) {}

  @Get()
  getCurriculumVitaes(@GetUser('id') userId: string) {
    return this.curriculumVitaeService.getCurriculumVitaes(userId);
  }

  @Get(':id')
  getCurriculumVitaesById(
    @GetUser('id') userId: string,
    @Param('id') cvId: string,
  ) {
    return this.curriculumVitaeService.getCurriculumVitaesById(userId, cvId);
  }

  @Post()
  CreateCurriculumVitaes(
    @GetUser('id') userId: string,
    @Body() dto: CreateCurriculumVitaeDto,
  ) {
    return this.curriculumVitaeService.CreateCurriculumVitaes(userId, dto);
  }

  @Patch(':id')
  editCurriculumVitaesById(
    @GetUser('id') userId: string,
    @Param('id') cvId: string,
    @Body() dto: EditCurriculumVitaeDto,
  ) {
    return this.curriculumVitaeService.editCurriculumVitaesById(
      userId,
      dto,
      cvId,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCurriculumVitaesById(
    @GetUser('id') userId: string,
    @Param('id') cvId: string,
  ) {
    return this.curriculumVitaeService.deleteCurriculumVitaesById(userId, cvId);
  }
}
