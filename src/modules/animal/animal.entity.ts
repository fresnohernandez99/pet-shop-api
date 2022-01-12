import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Breed } from "../breed/breed.entity";
import { Shop } from "../shop/shop.entity";

@Entity()
export class Animal extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

    @Column({ type: "decimal", nullable: false })
	price: number;

	@Column({ type: "int", nullable: false, default: 0 })
	amount: number;

	@ManyToOne(() => Shop, shop => shop.animals)
    shop: Shop;

	@ManyToOne(() => Breed, breed => breed.animals)
    breed: Breed;

}