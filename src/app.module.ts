import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenefitsService } from './benefits/benefits.service';
import { BenefitsController } from './benefits/benefits.controller';
import { Benefit } from './typeorm/entities/benefit';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenefitsModule } from './benefits/benefits.module';
import { MembershipModule } from './membership/membership.module';
import { Membership } from './typeorm/entities/membership';
import { MembershipBenefitsModule } from './membership_benefits/membership_benefits.module';
import { MembershipBenefit } from './typeorm/entities/membership.benefits';
import { Customer } from './typeorm/entities/customer';
import { CustomersModule } from './customers/customers.module';
import { CustomersMembership } from './typeorm/entities/customer.membership';
import { CustomerMembershipModule } from './customer_membership/customer_membership.module';
import { Brand } from './typeorm/entities/brands';
import { User } from './typeorm/entities/user';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'mydb',
    entities: [Benefit, Membership, MembershipBenefit, Customer, CustomersMembership, Brand, User],
    synchronize: true,
  }), BenefitsModule, MembershipModule, MembershipBenefitsModule, CustomersModule, CustomerMembershipModule, BrandModule, UserModule],
  controllers: [AppController  ],
  providers: [AppService   ],
})
export class AppModule {}
