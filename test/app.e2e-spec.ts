import { Test } from '@nestjs/testing';
// import { AppModule } from 'src/app.module';
// import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

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

  describe('Auth', () => {
    const dto: AuthDto = {
      // body to send in test
      email: 'testing1@gmail.com',
      password: '123',
    };
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

    //////////////////////////////// testing form field ////////////////////////////////////////
    describe('Signin', () => {
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto) //
          .expectStatus(200); // what we expect
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });
  describe('CurriculumVitae', () => {
    describe('Create curriculumVitae', () => {});

    describe('Get curriculumVitae', () => {});

    describe('Get curriculumVitae by id', () => {});

    describe('Edit curriculumVitae', () => {});

    describe('delete curriculumVitae', () => {});
  });

  it.todo('should pass');
});
