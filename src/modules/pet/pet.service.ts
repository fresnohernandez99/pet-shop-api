import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Animal } from "../animal/animal.entity";
import { Breed } from "../breed/breed.entity";
import { Person } from "../person/person.entity";
import { BuyDto } from "./dto/buy.deto";
import { Pet } from "./pet.entity";
import { PetRepository } from "./pet.repository";

@Injectable()
export class PetService {
	constructor(
		@InjectRepository(PetRepository)
		private readonly _repository: PetRepository
	) {}

	async getAllByOwner(id: number): Promise<Pet[]> {
		const pets: Pet[] = await this._repository.find({
			where: { owner: id },
		});

		return pets;
	}

	async buyPet(buyDto: BuyDto): Promise<Pet> {
		if (buyDto.money < buyDto.animal.price)
			throw new BadRequestException("Not enough money");

		const animalRepo = await getConnection().getRepository(Animal);
		const property = await animalRepo.findOne({
			where: { id: buyDto.animal.id },
		});

		if (!property) throw new BadRequestException();

		const personRepo = await getConnection().getRepository(Person);
		const owner = await personRepo.findOne({
			where: { id: buyDto.userId},
		});

		if (!property || !owner) throw new BadRequestException();

		if (property.amount > 1) {
			//put an animal out
			const update = new Animal();
			update.amount = property.amount - 1;
			update.id = property.id;
			update.breed = property.breed;
			update.price = property.price;
			update.shop = property.shop;

			await animalRepo.save({
				...property, // existing fields
				...update, // updated fields
			});
		} else {
			//delete animal instance
			await animalRepo.delete(property.id);
		}

		const pet = new Pet();
		pet.breed = buyDto.animal.breed
		pet.displayname = buyDto.displayname
		pet.owner = owner

		const savedPet: Pet = await this._repository.save(pet);
		return savedPet;
	}

	//Not aviable
	async update(id: number, pet: Pet): Promise<Object> {
		const property = await this._repository.findOne({
			where: { id },
		});

		if (property) {
			return await this._repository.save({
				...property, // existing fields
				...pet, // updated fields
			});
		} else throw new BadRequestException();
	}

	async delete(id: number): Promise<void> {
		const petExist = await this._repository.findOne(id);

		if (!petExist) {
			throw new NotFoundException();
		}

		await this._repository.delete(id);
	}
}
