import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class PersonsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllPersons() {
    return this.databaseService.person.findMany();
  }

  async getPerson(personId: number) {
    const person = await this.databaseService.person.findUnique({
      where: { id: personId },
    });
    if (!person)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Not found Person for ID' },
        HttpStatus.NOT_FOUND,
      );

    return person;
  }

  async createPerson(dto: createPerson) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Invalid data' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.databaseService.person.create({ data: dto });
  }

  async updatePerson(dto: createPerson, personId: number) {
    const person = await this.databaseService.person.findUnique({
      where: {
        id: personId,
      },
    });

    if (!person) {
      throw new HttpException(
        { error: 'Person not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.databaseService.person.update({
      where: {
        id: personId,
      },
      data: dto,
    });
  }

  async deletePerson(personId: number) {
    try {
      const result = await this.databaseService.person.delete({
        where: {
          id: personId,
        },
      });

      if (!result) {
        throw new HttpException(
          'Person for ID was removed',
          HttpStatus.NO_CONTENT,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Person for ID was removed',
        HttpStatus.NO_CONTENT,
      );
    }
  }
}
