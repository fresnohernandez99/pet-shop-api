import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private readonly _service: ShopService) {}

    @UseGuards(AuthGuard())
	@Get()
	async getShops(): Promise<Shop[]> {
		const shops = await this._service.getAll();
		return shops;
	}

	@Get(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async getShop(
		@Param("id", ParseIntPipe)
		id: number
	): Promise<Shop> {
		const shop = await this._service.get(id);
		return shop;
	}

    @Post()
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async createShop(
		@Body() shop: Shop,
	) {
		return await this._service.create(shop);
	}

	@Patch(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async updateShop(
		@Param("id", ParseIntPipe) id: number,
		@Body() shop: Shop,
	) {
		return await this._service.update(id, shop);
	}

	@Delete(":id")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async deleteShop(
		@Param("id", ParseIntPipe)
		id: number
	) {
		await this._service.delete(id);
		return {
			statusCode: 204,
			message: "You have deleted a person.",
		};
	}
}
