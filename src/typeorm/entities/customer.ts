import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CustomersMembership } from "./customer.membership";

@Entity({name: "customers"})
@Unique(["email"])
@Unique(["mobile"])
export class Customer {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
email: string;

@Column()
mobile: string;

@Column()
status: number;

@Column()
dob: Date;

@Column()
current_total_reward_points: number;

@Column({ default: new Date() })
created_at: Date;

@Column({ default: new Date() })
updated_at: Date;

@OneToMany( ()=> CustomersMembership, mb => mb.customer)
customer_membership: CustomersMembership[];
}