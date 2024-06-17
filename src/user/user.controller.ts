import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('api/user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    async findAll() {
        const data = await this.userService.findAll();
        if(data.length > 0) {
            return { data: data };
        } else { return {message:"no data found"}}
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe) id: number)  {

        const data = await this.userService.findOne(id);
        if(data) {
            return { data: data };
        } else { return {message:"no data found"}}
        
    }

    @Post()
    async create(@Body() dto: UserDto): Promise<UserDto> {
        return this.userService.create(dto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UserDto,
    ): Promise<UserDto> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{ message: string }> {
        return this.userService.delete(id);
    }
}
