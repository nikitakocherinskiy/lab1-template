/* eslint-disable prettier/prettier */
import { IsNumber, IsString, Min } from 'class-validator';

export class createPerson {
  @Min(1)
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  address: string;
  @IsString()
  work: string;
}
