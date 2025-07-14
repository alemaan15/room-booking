import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe tener al menos una mayúscula y un número',
    })
    @IsNotEmpty()
    password: string;
}