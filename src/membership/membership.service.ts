import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from 'src/typeorm/entities/membership';
import { DeleteResult, Repository } from 'typeorm';
import { MembershipDto } from './membership.dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership) private repository: Repository<Membership>,
  ) {}

  async findAll() {
    const data = await this.repository.find();
    if (data.length > 0) {
      return { data: data };
    } else {
      return {
        message: 'No data found',
      };
    }
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({where: {id: id}});
    if (data) {
      return { data: data };
    } else {
      return {
        message: 'No data found',
      };
    }
  }

  async create(membership: MembershipDto): Promise<Membership>{
    return await this.repository.save(membership);
  }

  async update(id: number, membershipDto: MembershipDto): Promise<Membership>{
    const membership = await this.repository.findOne({ where: { id } });
    if (!membership) {
        throw new NotFoundException('Membership not found');
    }

    Object.assign(membership, membershipDto);

    try {
        await this.repository.save(membership);
        return membership;
    } catch (error) {
       
        throw error;
    }

}


async delete(id: number): Promise<{ message: string, result: DeleteResult }> {
    const deleteResult = await this.repository.delete(id);

    if (deleteResult.affected === 0) {
        throw new NotFoundException('Membership not found');
    }

    return {
        message: 'Membership successfully deleted',
        result: deleteResult
    };
}


}
