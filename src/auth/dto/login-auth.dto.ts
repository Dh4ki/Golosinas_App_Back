import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginAuthDto{

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}