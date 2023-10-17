import { Injectable, NotFoundException } from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';

@Injectable()
export class PersonsService {
  private persons: createPerson[] = [];

  getAllPersons(): createPerson[] {
    return this.persons;
  }

  getPerson(personId: number): createPerson {
    const person = this.persons.find((p) => p.id === +personId);
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  createPerson(dto: createPerson): createPerson {
    const newPerson = new createPerson();
    newPerson.id = dto.id;
    newPerson.name = dto.name;
    newPerson.age = dto.age;
    newPerson.address = dto.address;
    newPerson.work = dto.work;
    this.persons.push(newPerson);
    return newPerson;
  }

  updatePerson({ id, name, age, address, work }): void {
    const index = this.persons.findIndex((p) => p.id === +id);
    if (index === -1) {
      throw new NotFoundException('Person not found');
    }
    this.persons[index].name = name;
    this.persons[index].age = age;
    this.persons[index].address = address;
    this.persons[index].work = work;
  }

  deletePerson(personId: number): void {
    const index = this.persons.findIndex((p) => p.id === +personId);
    if (index === -1) {
      throw new NotFoundException(`Person not found ${personId}`);
    }
    this.persons.splice(index, 1);
  }
}
