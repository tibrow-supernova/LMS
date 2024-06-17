import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MembershipBenefitDto {
    @IsNumber()
    @IsEmpty()
    membership_id: number;

    
    @IsEmpty()
    benefit_slug: number;

    @IsNumber()
    @IsEmpty()
    status: number;
}