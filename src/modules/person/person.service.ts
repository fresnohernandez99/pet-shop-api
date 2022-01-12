import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Role } from "../role/role.entity";
import { RoleRepository } from "../role/role.repository";
import { Person } from "./person.entity";
import { PersonRepository } from "./person.repository";

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(PersonRepository)
		private readonly _personRepository: PersonRepository,
		@InjectRepository(RoleRepository)
		private readonly _roleRepository: RoleRepository
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

	async create(person: Person): Promise<Person> {
		const repo = await getConnection().getRepository(Role);
		const defaultRole = await repo.findOne({ where: { name: "GENERAL" } });
		person.roles = [defaultRole];

		const savedPerson: Person = await this._personRepository.save(person);
		return savedPerson;
	}

	async update(id: number, person: Person): Promise<void> {
		await this._personRepository.update(id, person);
	}

	async delete(id: number): Promise<void> {
		const PersonExist = await this._personRepository.findOne(id);

		if (!PersonExist) {
			throw new NotFoundException();
		}

		await this._personRepository.delete(id);
	}

	async setRoleToPerson(personId: number, roleId: number) {
		const personExist = await this._personRepository.findOne(personId);

		if (!personExist) {
			throw new NotFoundException();
		}

		const roleExist = await this._roleRepository.findOne(roleId);

		if (!roleExist) {
			throw new NotFoundException("Role does not exist");
		}

		personExist.roles.push(roleExist);
		await this._personRepository.save(personExist);

		return true;
	}
}
