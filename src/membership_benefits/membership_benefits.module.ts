import { Module } from '@nestjs/common';
import { MembershipBenefitsController } from './membership_benefits.controller';
import { MembershipBenefitsService } from './membership_benefits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipBenefitDto } from './membership_benefites.dto';
import { MembershipBenefit } from 'src/typeorm/entities/membership.benefits';
import { Benefit } from 'src/typeorm/entities/benefit';

@Module({
  imports:[TypeOrmModule.forFeature([MembershipBenefit, Benefit])],
  controllers: [MembershipBenefitsController],
  providers: [MembershipBenefitsService]
})
export class MembershipBenefitsModule {}
