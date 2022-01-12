import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
} from "typeorm";
import { Pet } from "../pet/pet.entity";
import { Role } from "../role/role.entity";

@Entity()
export class Person extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

    @Column({ type: "varchar", nullable: false })
	displayname: string;

	@Column({ type: "varchar", unique: true, length: 25, nullable: false })
	username: string;

	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "varchar", nullable: false })
	password: string;

    @Column({ type: "varchar", nullable: true })
	photo: string;

	@ManyToMany(type => Role, role => role.people, { eager: true })
	@JoinTable({ name: 'person_roles' })
	roles: Role[];

	@OneToMany(() => Pet, pet => pet.owner)
    pets: Pet[];

	@CreateDateColumn({ type: "timestamp", name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp", name: "updated_at" })
	updatedAt: Date;
}
