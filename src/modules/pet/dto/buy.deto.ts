import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Animal } from "src/modules/animal/animal.entity";

export class BuyDto {
	@IsNotEmpty()
	@IsNumber()
	userId: number;

    @IsNotEmpty()	
	@IsNumber()
	money: number;

	@IsNotEmpty()
	@IsString()
	displayname: string;

    @IsNotEmpty()
	animal: Animal;
}
