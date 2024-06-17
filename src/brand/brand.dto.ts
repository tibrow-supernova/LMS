import { IsEmpty, IsNotEmpty } from "class-validator";

export class BrandDto {
    @IsNotEmpty()
    org_name: string;

    @IsNotEmpty()
    branch_name: string;

    @IsNotEmpty()
    location: string;
}