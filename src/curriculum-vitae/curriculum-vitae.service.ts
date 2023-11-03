import { ForbiddenException, Injectable } from '@nestjs/common';
// import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateCurriculumVitaeDto, EditCurriculumVitaeDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CurriculumVitaeService {
  constructor(private prisma: PrismaService) {}

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // get all CV
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  getCurriculumVitaes(userId: string) {
    return this.prisma.curriculumVitae.findMany({
      where: {
        userId,
      },
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // get CV by id
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  getCurriculumVitaesById(userId: string, cvId: string) {
    return this.prisma.curriculumVitae.findFirst({
      where: {
        id: cvId,
        userId,
      },
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // create CV
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  async CreateCurriculumVitaes(userId: string, dto: CreateCurriculumVitaeDto) {
    const cv = await this.prisma.curriculumVitae.create({
      data: {
        userId,
        ...dto,
      },
    });

    return cv;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // update CV
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  async editCurriculumVitaesById(
    userId: string,
    dto: EditCurriculumVitaeDto,
    cvId: string,
  ) {
    // 1. get the cv by id
    const cv = await this.prisma.curriculumVitae.findUnique({
      where: {
        id: cvId,
      },
    });

    // 2.check if user owns cv
    if (!cv || cv.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.curriculumVitae.update({
      where: {
        id: cvId,
      },
      data: {
        ...dto,
      },
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // delete one CV
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  async deleteCurriculumVitaesById(userId: string, cvId: string) {
    // 1. get the cv by id
    const cv = await this.prisma.curriculumVitae.findUnique({
      where: {
        id: cvId,
      },
    });

    // 2.check if user owns cv
    if (!cv || cv.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.curriculumVitae.delete({
      where: {
        id: cvId,
      },
    });
  }
}
