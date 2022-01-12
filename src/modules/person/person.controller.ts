import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { Person } from "./person.entity";
import { PersonService } from "./person.service";

@Controller("person")
export class PersonController {
	constructor(private readonly _personService: PersonService) {}

	@Get(":id")
	@Roles("ADMINISTRATOR")
	@UseGuards(AuthGuard(), RoleGuard)
	async getUser(@Param("id", ParseIntPipe) id: number): Promise<Person> {
		const user = await this._personService.get(id);
		return user;
	}

	@UseGuards(AuthGuard())
	@Get()
	async getPeople(): Promise<Person[]> {
		const people = await this._personService.getAll();
		return people;
	}

	@Post()
	async createPerson(@Body() person: Person): Promise<Person> {
		const createdPerson = await this._personService.create(person);
		return createdPerson;
	}

	@Patch(":id")
	async updatePerson(
		@Param("id", ParseIntPipe) id: number,
		@Body() person: Person
	) {
		const updatedPerson = await this._personService.update(id, person);
		return true;
	}

	@Delete(":id")
	async deletePerson(@Param("id", ParseIntPipe) id: number) {
		await this._personService.delete(id);
		return true;
	}

	@Post("setRole/:personId/:roleId")
	async setRoleToPerson(
		@Param("personId", ParseIntPipe) personId: number,
		@Param("personId", ParseIntPipe) roleId: number
	) {
		return this._personService.setRoleToPerson(personId, roleId);
	}
}
