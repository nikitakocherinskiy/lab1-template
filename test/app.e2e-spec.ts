import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Person API e2e tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/persons (POST) - success', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/persons')
      .send({
        name: 'nikita',
        age: 21,
        address: 'box',
        work: 'dev',
      });
    expect(res.statusCode).toBe(201);
  });

  it('/api/v1/persons (POST) - fail', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/persons')
      .send({
        name: 'nikita',
        age: '21',
        address: 'box',
        work: 'dev',
      });
    expect(res.statusCode).toBe(400);
  });
});
