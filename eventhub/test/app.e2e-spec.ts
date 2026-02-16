import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Subscriptions E2E', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // логинимся
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'alpha@mail.com',
        password: 'password',
      });

    token = res.body.access_token;
  });

  it('POST /subscriptions/:eventId', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/subscriptions/abf569a8-021f-4b73-b3f4-39f11797dfb2')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
