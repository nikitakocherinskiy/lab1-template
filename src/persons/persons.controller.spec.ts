import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

import { PersonsModule } from './persons.module';
import { DatabaseModule } from 'src/database/database.module';
import { Response } from 'express';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';

describe('PersonsController', () => {
  let controller: PersonsController;
  let service: PersonsService;

  const responseMock = {
    status: jest.fn().mockReturnThis(),
    location: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;

  const resultDto = {
    id: 1,
    name: 'nikita',
    age: 21,
    address: 'box',
    work: 'dev',
  };

  const resultUpdateDto = {
    id: 1,
    name: 'neekeka',
    age: 21,
    address: 'road',
    work: 'dev',
  };

  const dto: createPerson = {
    name: 'nikita',
    age: 21,
    address: 'box',
    work: 'dev',
  };

  const updateDto: createPerson = {
    name: 'neekea',
    age: 100,
    address: 'road',
    work: 'dev',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonsModule, DatabaseModule],
      controllers: [PersonsController],
      providers: [PersonsService],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPersons', () => {
    it('should return an array of all persons and status code 200 - success', async () => {
      const result = await controller.getPersons();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createPerson', () => {
    it('should create person and return status code 201 - success', async () => {
      jest
        .spyOn(service, 'createPerson')
        .mockImplementation(async () => resultDto);
      await controller.createPerson(dto, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith('Created new Person');
      expect(responseMock.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getPersonById', () => {
    it('should return status code 200 - fail (invalid data)', async () => {
      jest
        .spyOn(service, 'getPerson')
        .mockImplementation(async () => resultDto);
      const person = await controller.getPersonById(1, responseMock);
      expect(person).toEqual(resultDto);
    });

    it('should return status code 400 - fail (invalid data)', async () => {
      const personId = 2;
      jest.spyOn(service, 'getPerson').mockImplementation(() => {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Not found Person for ID' },
          HttpStatus.NOT_FOUND,
        );
      });
      await expect(
        controller.getPersonById(personId, responseMock),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePerson', () => {
    it('should update person and return it with status code 200 - success', async () => {
      jest
        .spyOn(service, 'updatePerson')
        .mockImplementation(async () => resultUpdateDto);
      const result = await controller.updatePerson(updateDto, 1);
      expect(result).toEqual(resultUpdateDto);
    });

    it('should not update person with status code 404 - fail (wrong id)', async () => {
      jest.spyOn(service, 'updatePerson').mockImplementation(() => {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Not found Person for ID' },
          HttpStatus.NOT_FOUND,
        );
      });
      await expect(controller.updatePerson(updateDto, 2)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('deletePerson', () => {
    it('should return status code 204 - success', async () => {
      const personId = 1;
      jest
        .spyOn(service, 'deletePerson')
        .mockImplementation(() => Promise.resolve());

      expect(await controller.deletePerson(personId)).toBeUndefined();
    });

    it('should return status code 204 - fail', async () => {
      const personId = 1;
      jest.spyOn(service, 'deletePerson').mockImplementation(() => {
        throw new HttpException(
          'Person for ID was removed',
          HttpStatus.NO_CONTENT,
        );
      });

      try {
        await controller.deletePerson(personId);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.status).toBe(HttpStatus.NO_CONTENT);
      }
    });
  });
});
