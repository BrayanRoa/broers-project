import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    public readonly fullName?: string;
    
    @IsEmail()
    @IsOptional()
    public readonly email?: string;
    
    @IsString()
    @IsOptional()
    public password?: string;
    
    @IsBoolean()
    @IsOptional()
    public isActive?: boolean = true;
}