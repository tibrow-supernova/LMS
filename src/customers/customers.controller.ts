import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomerDto } from './customer.dto';
import { CustomersService } from './customers.service';

@Controller('/api/customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) {}

  @Post()
  create(@Body() customerDto: CustomerDto) {
    return this.customerService.create(customerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }

  @Put(':id')
  update(@Param('id', new ParseIntPipe) id: number, @Body() updateCustomerDto: CustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }
}
