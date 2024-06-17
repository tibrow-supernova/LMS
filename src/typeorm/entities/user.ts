import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Brand } from "./brands";

@Entity()
@Unique(["email"])
@Unique(["mobile"])
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
email: string;

@Column()
mobile: string;


@Column()
brand_id: number;

@ManyToOne(()=> Brand, b=> b.user)
@JoinColumn({name:'brand_id'})
brand: Brand;


}