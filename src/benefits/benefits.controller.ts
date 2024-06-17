import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { Benefit } from 'src/typeorm/entities/benefit';
import { BenefitDto } from './benefits.dto';
import { DeleteResult } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Controller('/api/benefits/')
export class BenefitsController {

    constructor(private benefitService:BenefitsService){}

    @Get('')
    async findAll() {
        const data = await this.benefitService.findAll();
        if(data.length === 0){
        return {message:"no data found",}
        }else{
            return {data: data};
        }
    }
    
    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe) id: number) {
        const data = await this.benefitService.findOne(id);
        if(!data){
        return {message:"no data found",}
        }else{
            
            return plainToClass(BenefitDto, data);
        }
    }

    @Post('')
    async create(@Body() benefit: BenefitDto) {
        return plainToClass(BenefitDto, this.benefitService.create(benefit));
    }

    @Post('update/:id')
    async update(@Param('id', new ParseIntPipe) id:number, @Body() benefit: BenefitDto)  {
        return plainToClass(BenefitDto,this.benefitService.update(id, benefit));
    }

    @Post('delete/:id')
    async delete(@Param('id', new ParseIntPipe) id:number): Promise<{ message: string, result: DeleteResult }> {
        return this.benefitService.delete(id);
    }
}
