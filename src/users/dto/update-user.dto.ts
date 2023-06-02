import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto{

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: String;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastname?: String;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phone?: String;

    image?: String;
    notification_token?: String;
}