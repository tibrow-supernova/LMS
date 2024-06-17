import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CustomerDto{
  
@IsNotEmpty()
name: string;

@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
mobile: string;

@IsNotEmpty()
@IsNumber()
status: number;

@IsNotEmpty()
dob: Date;

@IsNotEmpty()
@IsNumber()
current_total_reward_points: number;
}