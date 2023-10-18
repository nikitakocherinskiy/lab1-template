import { Injectable, NotFoundException } from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';
import { DatabaseService } from 'src/database/database.service';

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
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  async createPerson(dto: createPerson) {
    return this.databaseService.person.create({ data: dto });
  }

  async updatePerson(dto: createPerson, personId: number) {
    return this.databaseService.person.update({
      where: {
        id: personId,
      },
      data: dto,
    });
  }

  async deletePerson(personId: number) {
    return this.databaseService.person.delete({
      where: {
        id: personId,
      },
    });
  }
}
