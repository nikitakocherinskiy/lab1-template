import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { PersonsService } from './persons/persons.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [PersonsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PersonsService, DatabaseService],
  exports: [],
})
export class AppModule {}
