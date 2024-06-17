import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/entities/customer';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomersService {

    constructor(@InjectRepository(Customer) private readonly customersRepository: Repository<Customer>){}

    async findAll() {
        const data = await  this.customersRepository.find();
        if (data.length > 0) {
            return { data: data };
        }else{
            return { message: 'No data found' };
        }
    }

    async findOne(id: number) {
        const data = await this.customersRepository.findOne({where: {id: id}});
        if (data) {
            return { data: data };
        }else{
            return { message: 'No data found' };
        }
    }

    async create(customerDto: CustomerDto): Promise<Customer> {
        try {
          const customer = this.customersRepository.create(customerDto);
          return await this.customersRepository.save(customer);
        } catch (error) {
          if (error.code === '23505') { 
            throw new BadRequestException('Email or mobile already exists');
          }
          throw error;
        }
      }

      async update(id: number, updateCustomerDto: CustomerDto): Promise<Customer> {
        await this.customersRepository.update(id, updateCustomerDto);
        const updatedCustomer = await this.customersRepository.findOne({where: {id: id}});
        return updatedCustomer;
      }
    
      async remove(id: number) {
        const result = await this.customersRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        }else{
          return {message:"delete successfuly done"}
        }
      }
}
