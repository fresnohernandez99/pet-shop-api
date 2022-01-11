import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "./person.entity";
import { PersonRepository } from "./person.repository";

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(PersonRepository)
		private readonly _personRepository: PersonRepository
	) {}

	async get(id: number): Promise<Person> {
		if (!id) {
			throw new BadRequestException("id must be sent");
		}

		const Person: Person = await this._personRepository.findOne(id);

		if (!Person) {
			throw new NotFoundException();
		}

		return Person;
	}

	async getAll(): Promise<Person[]> {
		const Persons: Person[] = await this._personRepository.find();

		return Persons;
	}

	async create(Person: Person): Promise<Person> {
		const savedPerson: Person = await this._personRepository.save(Person);
		return savedPerson;
	}

	async update(id: number, Person: Person): Promise<void> {
		await this._personRepository.update(id, Person);
	}

	async delete(id: number): Promise<void> {
		const PersonExist = await this._personRepository.findOne(id);

		if (!PersonExist) {
			throw new NotFoundException();
		}

		await this._personRepository.delete(id);
	}
}
