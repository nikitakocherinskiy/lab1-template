/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ErrorResponse {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  message: number;
}
