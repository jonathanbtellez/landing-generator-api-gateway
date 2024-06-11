import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "123456", required: true, description: 'Password user'})
  @IsNotEmpty()
  @IsString()
  password: string;
}