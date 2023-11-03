import { Test } from '@nestjs/testing';
// import { AppModule } from 'src/app.module';
// import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import {
  CreateCurriculumVitaeDto,
  EditCurriculumVitaeDto,
} from 'src/curriculum-vitae/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  // starting logic
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  //#################################################################################################/
  //#################################### AUTH #################################/
  //#################################################################################################/
  describe('Auth', () => {
    const dto: AuthDto = {
      // body to send in test
      email: 'testing1@gmail.com',
      password: '123',
    };
    ////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// SIGN UP form field ////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    describe('Signup', () => {
      //////////////////////////////// testing form field ////////////////////////////////////////
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password }) //
          .expectStatus(400); // what we expect
      });

      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400); // what we expect
      });

      it('should throw no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email }) //
          .expectStatus(400); // what we expect
      });

      it('should Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto) //
          .expectStatus(201); // what we expect
        // .inspect(); // for log
      });
    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// SIGN IN form field ////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password }) //
          .expectStatus(400); // what we expect
      });

      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400); // what we expect
      });

      it('should throw no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email }) //
          .expectStatus(400); // what we expect
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  //#################################################################################################/
  //#################################### USER #################################/
  //#################################################################################################/
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'yoollla',
          email: 'yoola@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  //#################################################################################################/
  //#################################### CV #################################/
  //#################################################################################################/
  describe('CurriculumVitae', () => {
    describe('Get empty curriculumVitae', () => {
      it('should get curriculumVitae', () => {
        return pactum
          .spec()
          .get('/curriculum-vitaes')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create curriculumVitae', () => {
      const dto: CreateCurriculumVitaeDto = {
        fullName: 'donata',
        email: 'dona@gmail.com',
        personalStatement: 'hsdfasliiiiiiijff',
        educationAndQualification: '2ertrewdfgfdsdffd',
        skills: 'dance',
        languages: 'English,Kinyarwanda',
        certifications: 'A0',
        workExperience: 'working',
        hobbiesAndInterests: 'watch movie and read manga',
      };
      it('should create curriculumVitae', () => {
        return pactum
          .spec()
          .post('/curriculum-vitaes')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('cvId', 'id');
      });
    });

    describe('Get curriculumVitaes', () => {
      it('should get curriculumVitaes', () => {
        return pactum
          .spec()
          .get('/curriculum-vitaes')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get curriculumVitae by id', () => {
      it('should get  cv by id', () => {
        return pactum
          .spec()
          .get('/curriculum-vitaes/{id}') // get params id
          .withPathParams('id', '$S{cvId}') // get by id
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{cvId}');
      });
    });

    describe('Edit curriculumVitae by id', () => {
      const dto: EditCurriculumVitaeDto = {
        fullName: 'should not be empty',
        email: ' should not be empty',
        personalStatement: 'should not be empty',
        educationAndQualification: 'should not be empty',
        skills: 'should not be empty',
        languages: ' should not be empty',
        certifications: ' should not be empty',
      };
      it('should edit cv by id', () => {
        return pactum
          .spec()
          .patch('/curriculum-vitaes/{id}') // get params id
          .withPathParams('id', '$S{cvId}') // get by id
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.fullName)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.personalStatement)
          .expectBodyContains(dto.educationAndQualification)
          .expectBodyContains(dto.skills)
          .expectBodyContains(dto.certifications)
          .expectBodyContains(dto.languages);
      });
    });

    describe('delete curriculumVitae by id', () => {
      it('should delete cv by id', () => {
        return pactum
          .spec()
          .delete('/curriculum-vitaes/{id}') // get params id
          .withPathParams('id', '$S{cvId}') // get by id
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(204);
      });
      it('should get empty cvs', () => {
        return pactum
          .spec()
          .get('/curriculum-vitaes')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
