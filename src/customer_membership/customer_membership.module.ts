import { Module } from '@nestjs/common';
import { CustomerMembershipController } from './customer_membership.controller';
import { CustomerMembershipService } from './customer_membership.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersMembership } from 'src/typeorm/entities/customer.membership';
import { Customer } from 'src/typeorm/entities/customer';
import { Membership } from 'src/typeorm/entities/membership';

@Module({
  imports:[TypeOrmModule.forFeature([CustomersMembership, Customer, Membership])],
  controllers: [CustomerMembershipController],
  providers: [CustomerMembershipService]
})
export class CustomerMembershipModule {}
