import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipBenefit } from 'src/typeorm/entities/membership.benefits';
import { Repository } from 'typeorm';
import { MembershipBenefitDto } from './membership_benefites.dto';
import { Benefit } from 'src/typeorm/entities/benefit';

@Injectable()
export class MembershipBenefitsService {
    constructor(@InjectRepository(MembershipBenefit) private membershipBenefitRepository: Repository<MembershipBenefit>,
    @InjectRepository(Benefit)
    private readonly benefitRepository: Repository<Benefit>,) {}

    async findAll(): Promise<MembershipBenefit[]> {
        return this.membershipBenefitRepository.find();
    }

    async findOne(id: number): Promise<MembershipBenefit> {
        const membershipBenefit = await this.membershipBenefitRepository.findOne({where: {id: id}});
        if (!membershipBenefit) {
            throw new NotFoundException('MembershipBenefit not found');
        }
        return membershipBenefit;
    }

    async create(membershipBenefitDto: MembershipBenefitDto): Promise<MembershipBenefit> {

        const membershipBenefit = new MembershipBenefit();
        membershipBenefit.membership_id = membershipBenefitDto.membership_id;

        const benefit = await this.benefitRepository.findOne({ where: { slug: membershipBenefitDto.benefit_slug } });
        if (!benefit) {
            throw new NotFoundException(`Benefit with slug '${membershipBenefitDto.benefit_slug}' not found`);
        }

        membershipBenefit.benefit_slug = benefit.slug;
        membershipBenefit.status = membershipBenefitDto.status;

        return this.membershipBenefitRepository.save(membershipBenefit);
    }

    async update(id: number, updateMembershipBenefitDto: MembershipBenefitDto): Promise<MembershipBenefit> {
        const membershipBenefit = await this.membershipBenefitRepository.findOne({where: {id: id}});
        if (!membershipBenefit) {
            throw new NotFoundException('MembershipBenefit not found');
        }
        const benefit = await this.benefitRepository.findOne({ where: { slug: updateMembershipBenefitDto.benefit_slug } });
        if (!benefit) {
            throw new NotFoundException(`Benefit with slug '${updateMembershipBenefitDto.benefit_slug}' not found`);
        }

        Object.assign(membershipBenefit, updateMembershipBenefitDto);

        return this.membershipBenefitRepository.save(membershipBenefit);
    }

    async delete(id: number): Promise<{ message: string }> {
        const deleteResult = await this.membershipBenefitRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('MembershipBenefit not found');
        }
        return { message: 'MembershipBenefit successfully deleted' };
    }
}
