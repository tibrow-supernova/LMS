import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user";

@Entity()
@Unique(["org_name"])
export class Brand {
@PrimaryGeneratedColumn()
id: number;

@Column()
org_name: string;

@Column()
branch_name: string;

@Column()
location: string;

@OneToMany(() => User, mb => mb.brand)
user: User[];

}