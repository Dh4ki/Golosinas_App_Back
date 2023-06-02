import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterAuthDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({},{message: 'El correo electrónico no es válido'})
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'La contraseña debe tener como mínimo 6 caracteres'})
    password: string;

    rolesIds: string[];

}