

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class RegisterUserRequestDto {
  @ApiProperty({ example: "juan", required: true, description: 'First name'})
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Rodriguez", required: true, description: 'Last name'})
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "1234555", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsString()
  password: string;
}