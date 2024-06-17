import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Membership } from "./membership";
import { Benefit } from "./benefit";

@Entity({name:'membership_benefits'})
export class MembershipBenefit {
@PrimaryGeneratedColumn()
id: number;

@Column()
membership_id: number;

@Column()
benefit_slug: number;

@Column()
status: number;


@Column({ default: new Date() })
created_at: Date;

@Column({ default: new Date() })
updated_at: Date;

@ManyToOne(()=> Membership, mb => mb.membership_benefits)
@JoinColumn({name:'membership_id'})
membership: Membership;

// @ManyToOne(()=> Benefit, b => b.membership_benefits )
// @JoinColumn({name:''})
// benefit: Benefit;

}