import { IsNotEmpty } from "class-validator";

export class BenefitDto {
    @IsNotEmpty()
    slug: number;
  
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    brief: string;
}