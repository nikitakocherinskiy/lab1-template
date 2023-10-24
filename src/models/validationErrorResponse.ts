/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ValidationErrorResponse {
  @ApiProperty({
    description: 'The message of the error',
    type: String,
  })
  @IsOptional()
  message: string;

  @ApiProperty({
    description: 'The errors',
    type: 'object',
    additionalProperties: {
      type: 'string',
    },
  })
  @IsOptional()
  errors: Record<string, string>;
}
