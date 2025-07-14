import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe tener al menos una mayúscula y un número',
    })
    @IsNotEmpty()
    password: string;

    @IsIn(['admin', 'user'], { message: 'El rol debe ser "admin" o "user"' })
    role: string;
}
