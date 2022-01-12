import { Module } from "@nestjs/common";
import { BreedService } from "./breed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { BreedRepository } from "./breed.repoistory";
import { BreedController } from "./breed.controller";

@Module({
	imports: [TypeOrmModule.forFeature([BreedRepository]), AuthModule],
	providers: [BreedService],
	controllers: [BreedController],
})
export class BreedModule {}
