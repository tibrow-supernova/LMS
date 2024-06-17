import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MembershipBenefit } from './membership.benefits';

@Entity({ name: 'benefits' })
@Unique(['slug'])
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: number;

  @Column()
  name: string;

  @Column()
  brief: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;


  // @OneToMany( ()=> MembershipBenefit, mb => mb.benefit)
  // membership_benefits: MembershipBenefit[];

}
