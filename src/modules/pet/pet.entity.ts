import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Breed } from "../breed/breed.entity";
import { Person } from "../person/person.entity";

@Entity()
export class Pet extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

    @Column({ type: "varchar", nullable: false })
	displayname: string;

    @ManyToOne(() => Person, person => person.pets)
    owner: Person;

	@ManyToOne(() => Breed, breed => breed.pets)
    breed: Breed;
}