import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "../animal/animal.entity";
import { Pet } from "../pet/pet.entity";

@Entity()
export class Shop extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

    @Column({ type: "varchar", nullable: false })
	displayname: string;

	@OneToMany(() => Animal, animal => animal.shop)
    animals: Animal[];

}