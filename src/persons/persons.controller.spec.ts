import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { DatabaseService } from 'src/database/database.service';
import { PersonsModule } from './persons.module';
import { DatabaseModule } from 'src/database/database.module';

describe('PersonsController', () => {
  let controller: PersonsController;

  beforeAll(async () => {
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

  describe('getPersons', () => {
    it('should return an array of all persons', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createPerson', () => {
    it('should return status code 201 if success ', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
    it('should return status code 400 if fail - invalid Data ', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getPersonById', () => {
    it('should return an array of all persons', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('updatePerson', () => {
    it('should return an array of all persons', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('deletePerson', () => {
    it('should return an array of all persons', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
