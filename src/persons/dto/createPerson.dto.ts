/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class createPerson {
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  address: string;
  @IsString()
  work: string;
}
