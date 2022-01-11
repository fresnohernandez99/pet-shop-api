import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './modules/person/person.module';
import { PetModule } from './modules/pet/pet.module';

@Module({
  imports: [PersonModule, PetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
