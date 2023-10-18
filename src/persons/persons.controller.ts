import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';
import { PersonsService } from './persons.service';
import { Response } from 'express';

@Controller('/api/v1/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('/')
  async getPersons() {
    this.personsService.getAllPersons();
  }

  @Get('/:personId')
  async getPersonById(@Param('personId', ParseIntPipe) personId: number) {
    if (personId === undefined) {
      throw new NotFoundException();
    }
    return this.personsService.getPerson(personId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/')
  async createPerson(@Body() dto: createPerson, @Res() res: Response) {
    const newPerson = await this.personsService.createPerson(dto);
    return res
      .status(HttpStatus.CREATED)
      .location(`/api/v1/persons/${newPerson.id}`)
      .send();
  }

  @Patch('/:personId')
  async updatePerson(
    @Body() dto: createPerson,
    @Param('personId', ParseIntPipe) personId: number,
  ) {
    return this.personsService.updatePerson(dto, personId);
  }

  @Delete('/:personId')
  async deletePerson(@Param('personId', ParseIntPipe) personId: number) {
    return this.personsService.deletePerson(personId);
  }
}
