import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "../role/guards/role.guard";
import { BuyDto } from "./dto/buy.deto";
import { Pet } from "./pet.entity";
import { PetService } from "./pet.service";

@Controller("pet")
export class PetController {
	constructor(private readonly _service: PetService) {}

	@UseGuards(AuthGuard())
	@Get(":id")
	async getAllByOwner(@Param("id", ParseIntPipe) id: number): Promise<Pet[]> {
		const pets = await this._service.getAllByOwner(id);
		return pets;
	}

	@Post()
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async buyPet(@Body() buyDto: BuyDto): Promise<Object> {
		return await this._service.buyPet(buyDto);
	}
}
