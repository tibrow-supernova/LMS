import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MembershipBenefit } from "./membership.benefits";
import { CustomersMembership } from "./customer.membership";

@Entity()
export class Membership {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
tire_floor_value: number;

@Column()
tire_ceil_value: number;

@Column()
status: number;

@Column('float')
purchase_to_point_conversation_rate: number;

@Column('float')
point_to_currency_conversion_rate: number;


@Column({ default: new Date() })
created_at: Date;

@Column({ default: new Date() })
updated_at: Date;

@OneToMany( ()=> MembershipBenefit, mb => mb.membership)
membership_benefits: MembershipBenefit[];


@OneToMany( ()=> CustomersMembership, mb => mb.membership)
customer_membership: CustomersMembership[];
}