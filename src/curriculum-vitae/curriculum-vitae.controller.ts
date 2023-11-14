import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiHeader,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { CurriculumVitaeService } from './curriculum-vitae.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateCurriculumVitaeDto, EditCurriculumVitaeDto } from './dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';

@ApiTags('CV')
@UseGuards(JwtGuard)
@Controller('curriculum-vitaes')
export class CurriculumVitaeController {
  constructor(private curriculumVitaeService: CurriculumVitaeService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Created user object as response',
  })
  @ApiBearerAuth('Authorization')
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
