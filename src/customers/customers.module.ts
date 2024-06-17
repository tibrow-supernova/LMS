import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/entities/customer';

@Module({
  imports:[TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
