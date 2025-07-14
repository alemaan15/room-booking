import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './interfaces/token.interface';
import { User, UserDocument } from '../users/entities/user.entity';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService

  ) { }
  async register(registerDto: RegisterDto): Promise<User> {
    const userExist = await this.userService.findByEmail(registerDto.email);

    if (userExist) {
      throw new ConflictException(`User with email ${registerDto.email} already exists`);
    }

    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const existsUser = await this.userService.findByEmail(loginDto.email);

    if (!existsUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, existsUser.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: existsUser.email, sub: existsUser._id, name: existsUser.name };

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESH'),
    })
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refresh_token,
    }
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    try {
      const user: UserDocument = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH'),
      });
      const { access_token, refresh_token } = await this.generateTokens(user);
      return {
        access_token,
        refresh_token,
        status: HttpStatus.CREATED,
        message: 'Refresh token successfully',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: UserDocument): Promise<Tokens> {
    const payload = { email: user.email, sub: user._id, name: user.name };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: this.configService.get('JWT_ACCESS'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configService.get('JWT_REFRESH'),
      }),
    ])

    return {
      access_token,
      refresh_token,
    };
  }
}
