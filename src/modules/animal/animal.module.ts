import { Module } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { AnimalController } from "./animal.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalRepository } from "./animal.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [TypeOrmModule.forFeature([AnimalRepository]), AuthModule],
	providers: [AnimalService],
	controllers: [AnimalController],
})
export class AnimalModule {}
