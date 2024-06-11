import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { RegisterUserEvent } from './events/register-user-event';
import { firstValueFrom } from 'rxjs';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignInEvent } from './events/sign-in-event ';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}
  async register(registerUserRequestDto: RegisterUserRequestDto) {
    try {
      const response = await firstValueFrom(this.authServiceClient.send(
        { cmd: 'register' },
        new RegisterUserEvent(
          registerUserRequestDto.firstName,
          registerUserRequestDto.lastName,
          registerUserRequestDto.email,
          registerUserRequestDto.password,
        ),
      ));

      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(signInRequestDto: SignInRequestDto) {
    try {
      const response = await firstValueFrom(this.authServiceClient.send(
        { cmd: 'login' },
        new SignInEvent(
          signInRequestDto.email,
          signInRequestDto.password
        ),
      ));

      return response;
    } catch (error) {

      throw new BadRequestException(error);
    }
  }
}
