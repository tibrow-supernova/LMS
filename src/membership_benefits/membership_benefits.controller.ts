import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MembershipBenefitsService } from './membership_benefits.service';
import { MembershipBenefit } from 'src/typeorm/entities/membership.benefits';
import { MembershipBenefitDto } from './membership_benefites.dto';

@Controller('/api/membership-benefits')
export class MembershipBenefitsController {

    constructor(private readonly membershipBenefitService: MembershipBenefitsService) {}

    @Get()
    async findAll() {
        const data = await this.membershipBenefitService.findAll();
        if(data.length > 0) {
            return { data: data };
        } else { return {message:"no data found"}}
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe) id: number)  {

        const data = await this.membershipBenefitService.findOne(id);
        if(data) {
            return { data: data };
        } else { return {message:"no data found"}}
        
    }

    @Post()
    async create(@Body() createMembershipBenefitDto: MembershipBenefitDto): Promise<MembershipBenefit> {
        return this.membershipBenefitService.create(createMembershipBenefitDto);
    }

    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() updateMembershipBenefitDto: MembershipBenefitDto,
    ): Promise<MembershipBenefit> {
        return this.membershipBenefitService.update(id, updateMembershipBenefitDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<{ message: string }> {
        return this.membershipBenefitService.delete(id);
    }
}
