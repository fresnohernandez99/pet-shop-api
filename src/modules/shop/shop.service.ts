import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { ShopRepository } from './shop.repoistory';

@Injectable()
export class ShopService {
    constructor(
		@InjectRepository(ShopRepository)
		private readonly _shopRepository: ShopRepository
	) {}

    async get(id: number): Promise<Shop> {
		if (!id) {
			throw new BadRequestException("id must be sent");
		}

		const shop: Shop = await this._shopRepository.findOne(id);

		if (!shop) {
			throw new NotFoundException();
		}

		return shop;
	}

	async getAll(): Promise<Shop[]> {
		const shops: Shop[] = await this._shopRepository.find();

		return shops;
	}

	async create(shop: Shop): Promise<Shop> {
		const savedShop: Shop = await this._shopRepository.save(shop);
		return savedShop;
	}

	async update(id: number, shop: Shop): Promise<Object> {
		const property = await this._shopRepository.findOne({
			where: { id },
		});

		if (property) {
			return await  this._shopRepository.save({
				...property, // existing fields
				...shop, // updated fields
			});
		} else throw new BadRequestException()
	}

	async delete(id: number): Promise<void> {
		const shopExist = await this._shopRepository.findOne(id);

		if (!shopExist) {
			throw new NotFoundException();
		}

		await this._shopRepository.delete(id);
	}

}
