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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('/')
  getPersons(): createPerson[] {
    return this.personsService.getAllPersons();
  }

  @Get('/:personId')
  getPersonById(
    @Param('personId', ParseIntPipe) personId: number,
  ): createPerson {
    if (personId === undefined) {
      throw new NotFoundException();
    }
    return this.personsService.getPerson(personId);
  }

  @UsePipes(new ValidationPipe())
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  createPerson(@Body() dto: createPerson) {
    this.personsService.createPerson(dto);
    // res.location(`/api/v1/persons/${dto.name}`);
    return dto;
  }

  @Patch('/:personId')
  @UsePipes(new ValidationPipe())
  updatePerson(@Body() dto: createPerson) {
    this.personsService.updatePerson(dto);
  }

  @Delete('/:personId')
  deletePerson(@Param('personId', ParseIntPipe) personId: number) {
    this.personsService.deletePerson(personId);
  }
}
