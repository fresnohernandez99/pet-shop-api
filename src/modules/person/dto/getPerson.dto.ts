import { IsNotEmpty } from "class-validator";
import { Role } from "src/modules/role/role.entity";
import { Person } from "../person.entity";

export class GetPersonDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	email: string;

	photo: string;

	@IsNotEmpty()
	roles: Role[];

	constructor(person: Person){
		this.username = person.username;

		this.email = person.email;

		this.roles = person.roles;

		this.photo = person.photo;
	}
}
