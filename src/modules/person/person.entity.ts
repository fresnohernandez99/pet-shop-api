import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Role } from "../role/role.entity";

@Entity("person")
export class Person extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

    @Column({ type: "varchar", unique: true, nullable: false })
	displayname: string;

	@Column({ type: "varchar", unique: true, length: 25, nullable: false })
	username: string;

	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "varchar", nullable: false })
	password: string;

    @Column({ type: "varchar", nullable: false })
	photo: string;

	@ManyToMany(type => Role, role => role.people, { eager: true })
	@JoinTable({ name: 'person_roles' })
	roles: Role[];

	@CreateDateColumn({ type: "timestamp", name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp", name: "updated_at" })
	updatedAt: Date;
}
