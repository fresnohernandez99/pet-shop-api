import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Request,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { RoleType } from "../role/roletype.enum";
import { GetPersonDto } from "./dto/getPerson.dto";
import { Person } from "./person.entity";
import { PersonService } from "./person.service";

@Controller("person")
export class PersonController {
	constructor(private readonly _personService: PersonService) {}

	@UseGuards(AuthGuard())
	@Get()
	async getPeople(): Promise<GetPersonDto[]> {
		const people = await this._personService.getAll();
		let formatedPeople = people.map((item) => new GetPersonDto(item));
		return formatedPeople;
	}

	@Get(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getUser(
		@Param("id", ParseIntPipe)
		id: number
	): Promise<Person> {
		const user = await this._personService.get(id);
		return user;
	}

	@Patch(":id")
	@UseGuards(AuthGuard(), RoleGuard)
	async updatePerson(
		@Request() req,
		@Param("id", ParseIntPipe) id: number,
		@Body() person: Person
	) {
		if (req.user.id != id) return new UnauthorizedException();

		await this._personService.update(id, person);
		return {
			statusCode: 202,
			message: "You have updated a person.",
		};
	}

	@Delete(":id")
	@UseGuards(AuthGuard(), RoleGuard)
	async deletePerson(
		@Request() req,
		@Param("id", ParseIntPipe)
		id: number
	) {
		if (req.user.id != id) return new UnauthorizedException();

		await this._personService.delete(id);
		return {
			statusCode: 204,
			message: "You have deleted a person.",
		};
	}

	@Post("setRole/:personId/:roleId")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async setRoleToPerson(
		@Param("personId", ParseIntPipe) personId: number,
		@Param("personId", ParseIntPipe) roleId: number
	) {
		return this._personService.setRoleToPerson(personId, roleId);
	}
}
