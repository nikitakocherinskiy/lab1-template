import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import { PersonsModule } from './persons.module';
import { DatabaseModule } from 'src/database/database.module';
import { PersonsController } from './persons.controller';

describe('PersonsService', () => {
  let service: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonsModule, DatabaseModule],
      controllers: [PersonsController],
      providers: [PersonsService, DatabaseModule],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
