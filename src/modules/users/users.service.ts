import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    })

    if (existUser) {
      throw new ConflictException(`User with name ${createUserDto.name} already exists`);
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOne(id: number) {
    const existUser = await this.userModel.findById(id);

    if (!existUser) {
      throw new ConflictException(`User with id ${id} does not exist`);
    }

    return this.userModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true, // devuelve el documento actualizado
      runValidators: true,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
