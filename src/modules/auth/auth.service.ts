import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService

  ) { }
  async register(registerDto: RegisterDto) {
    const userExist = await this.userService.findByEmail(registerDto.email);

    if (userExist) {
      throw new ConflictException(`User with email ${registerDto.email} already exists`);
    }

    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const existsUser = await this.userService.findByEmail(loginDto.email);

    if (!existsUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, existsUser.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: existsUser.email, sub: existsUser._id, name: existsUser.name };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESH'),
    })
    return {
      access_token: await this.jwtService.signAsync(payload),
      refreshToken: refreshToken,
    }
  }
}
