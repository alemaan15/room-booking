import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService

  ) { }
  async register(registerDto: RegisterDto) {
    const userExist = await this.userService.findByEmail(registerDto.email);

    if (userExist) {
      throw new ConflictException(`User with email ${registerDto.email} already exists`);
    }

    return this.userService.create(registerDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
