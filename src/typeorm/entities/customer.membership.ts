import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Membership } from "./membership";
import { Customer } from "./customer";

@Entity()
export class CustomersMembership {
@PrimaryGeneratedColumn()
id: number;

@Column()
customer_id: number;

@Column()
membership_id: number;

@Column()
status: number;

@Column({ default: new Date() })
created_at: Date;

@Column({ default: new Date() })
updated_at: Date;

@ManyToOne(()=> Membership, mb => mb.customer_membership)
@JoinColumn({name:'membership_id'})
membership: Membership;

@ManyToOne(()=> Customer, b => b.customer_membership  ,{eager:true}  )
@JoinColumn({name:'customer_id'})
customer: Customer;
}