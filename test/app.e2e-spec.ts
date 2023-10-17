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

  it('/app/persons (POST) - success', async () => {
    const res = await request(app.getHttpServer()).post('/app/persons').send({
      id: 1,
      name: 'nikita',
      age: 21,
      address: 'box',
      work: 'dev',
    });
    expect(res.body.id).toBeGreaterThan(0);
    expect(res.body.name).toBe('nikita');
    expect(res.body.age).toBe(21);
    expect(res.body.address).toBe('box');
    expect(res.body.work).toBe('dev');
    expect(res.statusCode).toBe(201);
  });

  it('/app/persons (POST) - fail', async () => {
    const res = await request(app.getHttpServer()).post('/app/persons').send({
      id: 0,
      name: 'nikita',
      age: 21,
      address: 'box',
      work: 'dev',
    });
    expect(res.statusCode).toBe(400);
  });
});
