import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEmail()
    mobile: string;


    @IsNotEmpty()
    brand_id: number;
}