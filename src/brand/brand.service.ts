import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/typeorm/entities/brands';
import { Repository } from 'typeorm';
import { BrandDto } from './brand.dto';

@Injectable()
export class BrandService {
    constructor(@InjectRepository(Brand) private repository: Repository<Brand>) {}

    async findAll(){
        const data = await this.repository.find();
        if(data.length > 0) {return {data: data}}else{
            return {message: 'No data found'}
        }
    }


    async findOne(id: number) {
        const data = await this.repository.findOne({where: {id: id}});
        if (data) {
            return { data: data };
        }else{
            return { message: 'No data found' };
        }
    }

    async create(brandDto: BrandDto): Promise<Brand> {
        try {
            console.log(brandDto.org_name)
          const brand = this.repository.create(brandDto);
          return await this.repository.save(brand);
        } catch (error) {
          if (error.code === '23505') { 
            throw new BadRequestException('Organization already exists');
          }
          throw error;
        }
      }

      async update(id: number, brandDto: BrandDto): Promise<Brand> {
        await this.repository.update(id, brandDto);
        const updatedBrand = await this.repository.findOne({where: {id: id}});
        return updatedBrand;
      }
    
      async remove(id: number) {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Brand with ID ${id} not found`);
        }else{
          return {message:"delete successfuly done"}
        }
      }
    
}
