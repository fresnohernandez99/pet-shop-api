import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Breed } from './breed.entity';
import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
    constructor(private readonly _service: BreedService) {}

    @UseGuards(AuthGuard())
	@Get()
	async getBreeds(): Promise<Breed[]> {
		const breeds = await this._service.getAll();
		return breeds;
	}

	@Get(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getBreed(
		@Param("id", ParseIntPipe)
		id: number
	): Promise<Breed> {
		const user = await this._service.get(id);
		return user;
	}

    @Post()
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async createBreed(
		@Body() breed: Breed,
	) {
		return await this._service.create(breed);
	}

	@Patch(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async updateBreed(
		@Param("id", ParseIntPipe) id: number,
		@Body() breed: Breed,
	) {
		return await this._service.update(id, breed);
	}

	@Delete(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async deletePerson(
		@Param("id", ParseIntPipe)
		id: number
	) {
		await this._service.delete(id);
		return {
			statusCode: 204,
			message: "You have deleted a person.",
		};
	}
}
