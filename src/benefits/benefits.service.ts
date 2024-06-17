import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Benefit } from 'src/typeorm/entities/benefit';
import { DeleteResult, Repository } from 'typeorm';
import { BenefitDto } from './benefits.dto';


@Injectable()
export class BenefitsService {
    constructor(@InjectRepository(Benefit) private repository:Repository<Benefit>) {
    }

    async findAll(): Promise<Benefit[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<Benefit> {
        return await this.repository.findOne({where: {id: id}});
    }

    async create(benefit: BenefitDto): Promise<Benefit> {
        return await this.repository.save(benefit);
    }
    async update(id: number, benefitDto: BenefitDto): Promise<Benefit> {
        const benefit = await this.repository.findOne({ where: { id } });
        if (!benefit) {
            throw new NotFoundException('Benefit not found');
        }
 
        Object.assign(benefit, benefitDto);
 
        try {
            await this.repository.save(benefit);
            return benefit;
        } catch (error) {
            if (error.code === '23505') { // Assuming PostgreSQL unique violation error code
                throw new ConflictException('Slug already exists');
            }
            throw error;
        }
    }

    async delete(id: number): Promise<{ message: string, result: DeleteResult }> {
        const deleteResult = await this.repository.delete(id);

        if (deleteResult.affected === 0) {
            throw new NotFoundException('Benefit not found');
        }

        return {
            message: 'Benefit successfully deleted',
            result: deleteResult
        };
    }

}
