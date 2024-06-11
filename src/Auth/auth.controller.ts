import { BadRequestException, Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from './dto/sign-in-request.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller({
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Access token' })
  @Post('/register')
  async register(@Body() registerUserRequestDto : RegisterUserRequestDto) {
    try{
      const response = await this.authService.register(registerUserRequestDto);
      return response;
    }catch(error){
      throw error;
    }
  }

  @ApiOperation({ summary: 'handle login' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 200, description: 'Access token' })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() signInRequestDto : SignInRequestDto) {
    try{
      const response = await this.authService.login(signInRequestDto);
      return response;
    }catch(error){
      throw error;
    }
  }
}
