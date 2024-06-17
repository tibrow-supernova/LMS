import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/entities/customer';
import { CustomersMembership } from 'src/typeorm/entities/customer.membership';
import { Membership } from 'src/typeorm/entities/membership';
import { Repository } from 'typeorm';
import { CustomerMembershipDto } from './customer_membership.dto';

@Injectable()
export class CustomerMembershipService {
    constructor(@InjectRepository(CustomersMembership) private repo:Repository<CustomersMembership>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
){}

    async findAll() {
        const data  = await this.repo.find();
        if(data.length > 0){return {data: data}}else{return "No data found";}
    }
    
    async findOne(id: number) {
        const data  = await this.repo.findOne({where: {id: id}});
        if(data){return {data: data}}else{return "No data found";}
    }

    async create(customerMembershipDto: CustomerMembershipDto) {

        const customer_membership = new CustomersMembership();
        customer_membership.membership_id = customerMembershipDto.membership_id;

        const member = await this.membershipRepository.findOne({ where: { id: customerMembershipDto.membership_id } });
        if (!member) {
            throw new NotFoundException(`Membership with id '${customerMembershipDto.membership_id}' not found`);
        }

        const customer = await this.customerRepository.findOne({ where: { id: customerMembershipDto.customer_id } });
        if (!customer) {
            throw new NotFoundException(`Customer with id '${customerMembershipDto.customer_id}' not found`);
        }

        customer_membership.customer_id = customer.id;
        customer_membership.membership_id = member.id;
        customer_membership.status = customerMembershipDto.status;

        return this.repo.save(customer_membership);
    }

    
}
