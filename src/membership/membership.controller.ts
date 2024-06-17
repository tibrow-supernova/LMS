import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipDto } from './membership.dto';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

@Controller('/api/memberships') 
export class MembershipController {

    constructor(private membershipService:MembershipService){}

    @Get('')
    async findAll(){
        return this.membershipService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe) id:number){
        const data = await this.membershipService.findOne(id);
        if(!data){
        return {message:"no data found",}
        }else{
            
            return plainToClass(MembershipDto, data);
        }
    }

    @Post('')
    async create(@Body() membershipDto: MembershipDto) {
        return plainToClass(MembershipDto, this.membershipService.create(membershipDto));
    }

    @Post('update/:id')
    async update(@Param('id', new ParseIntPipe) id:number, @Body() membershipDto: MembershipDto)  {
        return plainToClass(MembershipDto,this.membershipService.update(id, membershipDto));
    }

    @Post('delete/:id')
    async delete(@Param('id', new ParseIntPipe) id:number): Promise<{ message: string, result: DeleteResult }> {
        return this.membershipService.delete(id);
    }

}
