import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Animal } from './animal.entity';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
    constructor(private readonly _service: AnimalService) {}

    @UseGuards(AuthGuard())
	@Get()
	async getAnimals(): Promise<Animal[]> {
		const animals = await this._service.getAll();
		return animals;
	}

    @UseGuards(AuthGuard())
	@Get("/shop/:id")
	async getAnimalsByShop(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<Animal[]> {
		const animals = await this._service.getAllByShop(id);
		return animals;
	}

    @UseGuards(AuthGuard())
	@Get("/breed/:id")
	async getAnimalsByBreed(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<Animal[]> {
		const animals = await this._service.getAllByBreed(id);
		return animals;
	}

    @UseGuards(AuthGuard())
	@Get("/filtered/:shopId/:breedId")
	async getAnimalsFiltered(
        @Param("shopId", ParseIntPipe) shopId: number,
        @Param("breedId", ParseIntPipe) breedId: number,
    ): Promise<Animal[]> {
		const animals = await this._service.getAllFiltered(shopId, breedId);
		return animals;
	}

	@Post(":id")
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async buyAnimal(
		@Param("id", ParseIntPipe) id: number,
        @Body() money: number
	): Promise<Animal> {
		const animal = await this._service.get(id);
		return animal;
	}

    @Post()
	@Roles(RoleType.ADMIN, RoleType.SELLER)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async createAnimal(
		@Body() animal: Animal,
	) {
		return await this._service.create(animal);
	}

	@Patch(":id")
	@Roles(RoleType.ADMIN, RoleType.SELLER)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async updateAnimal(
		@Param("id", ParseIntPipe) id: number,
		@Body() animal: Animal,
	) {
		return await this._service.update(id, animal);
	}

    @Patch("/add/:id/:amount")
	@Roles(RoleType.ADMIN, RoleType.SELLER)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async addAnimalsToAmount(
		@Param("id", ParseIntPipe) id: number,
        @Param("amount", ParseIntPipe) amount: number
	) {
		return await this._service.addAnimalsToAmount(id, amount);
	}

	@Delete(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async deleteAnimal(
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
