import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword
    });
    return createdUser.save();
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOne(id: string) {
    const existUser = await this.userModel.findById(id);

    if (!existUser) {
      throw new ConflictException(`User with id ${id} does not exist`);
    }

    return existUser;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      email: email,
    })

    if (!user) {
      throw new ConflictException(`User with id ${email} does not exist`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true, // devuelve el documento actualizado
      runValidators: true,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
