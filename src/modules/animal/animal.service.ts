import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { Breed } from '../breed/breed.entity';
import { Shop } from '../shop/shop.entity';
import { Animal } from './animal.entity';
import { AnimalRepository } from './animal.repository';

@Injectable()
export class AnimalService {
    constructor(
		@InjectRepository(AnimalRepository)
		private readonly _repository: AnimalRepository
	) {}

    async get(id: number): Promise<Animal> {
		if (!id) {
			throw new BadRequestException("id must be sent");
		}

		const animal: Animal = await this._repository.findOne(id ,{
			relations: ["breed"]
		});

		if (!animal) {
			throw new NotFoundException();
		}

		return animal;
	}

	async getAll(): Promise<Animal[]> {
		const animals: Animal[] = await this._repository.find({ relations: ["breed", "shop"] });

		return animals;
	}

	async getAllByShop(shopId: number): Promise<Animal[]> {
		const animals: Animal[] = await this._repository.find({
			where : { shop : shopId }, relations: ["breed", "shop"]
		});

		return animals;
	}

	async getAllByBreed(breedId: number): Promise<Animal[]> {
		const animals: Animal[] = await this._repository.find({
			where : { breed : breedId, relations: ["breed", "shop"] }
		});

		return animals;
	}

	async getAllFiltered(shopId: number, breedId: number): Promise<Animal[]> {
		const animals: Animal[] = await this._repository.find({
			where : { shop : shopId, breed : breedId, relations: ["breed"]  }
		});

		return animals;
	}

	async create(animal: Animal): Promise<Animal> {
		const shopRepo = await getConnection().getRepository(Shop);
		const existShop = await shopRepo.findOne({
			where: { id: animal.shop },
		});

		const breedRepo = await getConnection().getRepository(Breed);
		const existBreed = await breedRepo.findOne({
			where: { id: animal.breed },
		});

		if (!existShop || !existBreed) throw new BadRequestException()

		animal.breed = existBreed
		animal.shop = existShop

		const savedAnimal: Animal = await this._repository.save(animal);
		return savedAnimal;
	}

	async update(id: number, animal: Animal): Promise<Object> {
		const property = await this._repository.findOne({
			where: { id },
		});

		if (property) {
			return await  this._repository.save({
				...property, // existing fields
				...animal, // updated fields
			});
		} else throw new BadRequestException()
	}

	async addAnimalsToAmount(id: number, amount: number): Promise<Object> {
		const property = await this._repository.findOne({
			where: { id },
		});

		if (property) {
			const update = new Animal()
			update.amount = property.amount + amount
			update.id = property.id
			update.breed = property.breed
			update.price = property.price
			update.shop = property.shop

			return await  this._repository.save({
				...property, // existing fields
				...update, // updated fields
			});
		} else throw new BadRequestException()
	}

	async delete(id: number): Promise<void> {
		const animalExist = await this._repository.findOne(id);

		if (!animalExist) {
			throw new NotFoundException();
		}

		await this._repository.delete(id);
	}
}
