import { Body, Controller, Post, Inject } from '@nestjs/common';
import type { IAuthService } from '../../infra/auth/interfaces/i-auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
