import { IS_EMPTY, IsEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class CustomerMembershipDto {
    @IsEmpty()
    @IsNumber()
    customer_id: number;

    @IsEmpty()
    @IsNumber()
    membership_id: number;

    @IsEmpty()
    @IsNumber()
    status: number;
}