/* eslint-disable prettier/prettier */

import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonResponse {
  @ApiProperty({
    type: Number,
    required: true,
  })
  id: number;
  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  age: number;
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  address: string;
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  work: string;
}
