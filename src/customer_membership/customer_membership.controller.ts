import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CustomerMembershipService } from './customer_membership.service';
import { CustomerMembershipDto } from './customer_membership.dto';
import { CustomersMembership } from 'src/typeorm/entities/customer.membership';

@Controller('api/customer-membership')
export class CustomerMembershipController {

    constructor(private customerMemberShipService:CustomerMembershipService){}

    @Get()
    findAll() {
        return this.customerMemberShipService.findAll();
    }


    @Get(':id')
    findOne(@Param('id', new ParseIntPipe) id :number){
        return this.customerMemberShipService.findOne(id);
    }

    @Post()
    create(@Body() customerMembershipDto: CustomerMembershipDto):Promise<CustomersMembership> {
        return this.customerMemberShipService.create(customerMembershipDto);
    }
}
