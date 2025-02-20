import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    public readonly fullName!: string;

    @IsEmail()
    @IsNotEmpty()
    public readonly email!: string;

    @IsString()
    @IsNotEmpty()
    public password!: string;

    @IsBoolean()
    @IsNotEmpty()
    public isActive: boolean = true;
}