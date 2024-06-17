import { IsNotEmpty, IsNumber } from "class-validator";

export class MembershipDto{
@IsNotEmpty()
name: string;

@IsNotEmpty()
@IsNumber()
tire_floor_value: number;

@IsNotEmpty()
@IsNumber()
tire_ceil_value: number;

@IsNotEmpty()
@IsNumber()
status: number;

@IsNotEmpty()
@IsNumber()
purchase_to_point_conversation_rate: number;

@IsNotEmpty()
@IsNumber() 
point_to_currency_conversion_rate: number;
}