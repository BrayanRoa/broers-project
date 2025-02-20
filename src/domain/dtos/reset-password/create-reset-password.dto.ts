import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePasswordResetTokenDto {

    @IsString()
    @IsNotEmpty()
    public readonly token!: string;

    @IsEmail()
    @IsNotEmpty()
    public readonly userId!: string;

    @IsDate()
    @IsNotEmpty()
    public readonly expiresAt!: Date
}