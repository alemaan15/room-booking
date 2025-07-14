import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/refresh')
  refreshTokens(@Req() request: Request) {
    const refreshToken = request.headers['authorization']?.split(' ')[1];

    if (!refreshToken) {
      return { status: 401, message: 'Refresh token is required' };
    }
    return this.authService.refreshTokens(refreshToken);
  }
}
