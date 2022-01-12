import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './breed.entity';
import { BreedRepository } from './breed.repoistory';

@Injectable()
export class BreedService {
    constructor(
		@InjectRepository(BreedRepository)
		private readonly _repository: BreedRepository
	) {}

    async get(id: number): Promise<Breed> {
		if (!id) {
			throw new BadRequestException("id must be sent");
		}

		const breed: Breed = await this._repository.findOne(id);

		if (!breed) {
			throw new NotFoundException();
		}

		return breed;
	}

	async getAll(): Promise<Breed[]> {
		const breeds: Breed[] = await this._repository.find();

		return breeds;
	}

	async create(breed: Breed): Promise<Breed> {
		const savedBreed: Breed = await this._repository.save(breed);
		return savedBreed;
	}

	async update(id: number, breed: Breed): Promise<Object> {
		const property = await this._repository.findOne({
			where: { id },
		});

		if (property) {
			return await  this._repository.save({
				...property, // existing fields
				...breed, // updated fields
			});
		} else return new InternalServerErrorException()
	}

	async delete(id: number): Promise<void> {
		const breedExist = await this._repository.findOne(id);

		if (!breedExist) {
			throw new NotFoundException();
		}

		await this._repository.delete(id);
	}

}
