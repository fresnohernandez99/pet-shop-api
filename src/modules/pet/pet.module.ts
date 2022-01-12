import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetRepository } from './pet.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PetRepository]), AuthModule],
	providers: [PetService],
	controllers: [PetController],
})
export class PetModule {}
