import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
} from "typeorm";

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
}
