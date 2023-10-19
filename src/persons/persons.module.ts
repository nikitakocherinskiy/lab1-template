import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonsController],
  providers: [PersonsService, DatabaseService],
  exports: [PersonsService],
})
export class PersonsModule {}
