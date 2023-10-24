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
  Res,
  HttpStatus,
  HttpException,
  ValidationPipe,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { createPerson } from './dto/createPerson.dto';
import { PersonResponse } from 'src/models/personResponse';
import { PersonsService } from './persons.service';
import { Response } from 'express';
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/models/errorResponse';
import { ValidationErrorResponse } from 'src/models/validationErrorResponse';

@ApiTags('Person REST API operations')
@Controller('/api/v1/persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}
  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All Persons',
    isArray: true,
    type: PersonResponse,
  })
  @ApiOperation({
    summary: 'Gets all persons',
    operationId: 'listPersons',
  })
  async getPersons() {
    const persons = await this.personsService.getAllPersons();
    return persons;
  }

  @UsePipes(new ValidationPipe())
  @Post('/')
  @ApiOperation({
    summary: 'Create new Person',
    operationId: 'createPerson',
  })
  @ApiBody({ type: [createPerson] })
  @ApiParam({
    name: 'PersonRequest',
    required: true,
    description: 'Person description',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created new Person',
    headers: {
      location: {
        description: 'Path to new Person',
        style: 'simple',
        schema: { type: 'string' },
      },
    },
    type: createPerson,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
    type: ValidationErrorResponse,
  })
  async createPerson(@Body() dto: createPerson, @Res() res: Response) {
    try {
      const newPerson = await this.personsService.createPerson(dto);
      res
        .status(HttpStatus.CREATED)
        .location(`/api/v1/persons/${newPerson.id}`)
        .send('Created new Person');
      return newPerson;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid data',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: e,
        },
      );
    }
  }

  @ApiOperation({
    summary: 'Get Person by ID',
    operationId: 'getPerson',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Person for ID',
    type: PersonResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found Person for ID',
    type: ErrorResponse,
  })
  @Get('/:id')
  async getPersonById(
    @Param('id', ParseIntPipe) personId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      res.status(HttpStatus.OK);
      return this.personsService.getPerson(personId);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @ApiOperation({
    summary: 'Remove Person by ID',
    operationId: 'editPerson_1',
  })
  @ApiBody({ type: [createPerson] })
  @ApiParam({
    name: 'PersonRequest',
    required: true,
    description: 'Person description',
    schema: {
      type: 'createPerson',
    },
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Person for ID was remove',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePerson(@Param('id', ParseIntPipe) personId: number) {
    return this.personsService.deletePerson(personId);
  }

  @ApiOperation({
    summary: 'Update Person by ID',
    operationId: 'editPerson',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Person for ID was updated',
    type: PersonResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
    type: ValidationErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found Person for ID',
    type: ErrorResponse,
  })
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async updatePerson(
    @Body() dto: createPerson,
    @Param('id', ParseIntPipe) personId: number,
  ) {
    try {
      return await this.personsService.updatePerson(dto, personId);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found Person for ID',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: e,
        },
      );
    }
  }
}
