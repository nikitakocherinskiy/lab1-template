import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { DatabaseService } from 'src/database/database.service';
import { PersonsModule } from './persons.module';
import { DatabaseModule } from 'src/database/database.module';

describe('PersonsController', () => {
  let controller: PersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonsModule, DatabaseModule],
      controllers: [PersonsController],
      providers: [PersonsService, DatabaseService],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
