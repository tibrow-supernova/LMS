import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDto } from './brand.dto';

@Controller('api/brand')
export class BrandController {
    constructor(private brandSerive: BrandService) { }

    @Post()
    create(@Body() brandDto: BrandDto) {
        console.log( console.log(brandDto.org_name))
        return this.brandSerive.create(brandDto);
    }

    @Get()
    findAll() {
        return this.brandSerive.findAll();
    }
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe) id: number) {
        return this.brandSerive.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe) id: number) {
        return this.brandSerive.remove(id);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe) id: number, @Body() brandDto: BrandDto) {
        return this.brandSerive.update(id, brandDto);
    }
}
