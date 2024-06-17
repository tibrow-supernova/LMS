import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { Repository } from 'typeorm';
import { Brand } from 'src/typeorm/entities/brands';
import { User } from 'src/typeorm/entities/user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo:Repository<User>,
        @InjectRepository(Brand) private repoBrand:Repository<Brand>,
){}

    async findAll(): Promise<User[]> {
        return this.repo.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.repo.findOne({where: {id: id}});
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    async create(userDto: UserDto): Promise<User> {

        const user = new User();
        user.brand_id = userDto.brand_id;

        const brand = await this.repoBrand.findOne({ where: { id: userDto.brand_id } });
        if (!brand) {
            throw new NotFoundException(`Brand not found`);
        }

        user.name = userDto.name
        user.email = userDto.email;
        user.mobile = userDto.mobile;   

        return this.repo.save(user);
    }

    async update(id: number, updateuserDto: UserDto): Promise<User> {
        const user = await this.repo.findOne({where: {id: id}});
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const benefit = await this.repoBrand.findOne({ where: { id: updateuserDto.brand_id } });
        if (!benefit) {
            throw new NotFoundException(`brand not found`);
        }

        Object.assign(user, updateuserDto);

        return this.repo.save(user);
    }

    async delete(id: number): Promise<{ message: string }> {
        const deleteResult = await this.repo.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('user not found');
        }
        return { message: 'user successfully deleted' };
    }
}
