import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from 'src/room/application/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/application/dto/update-room.dto';
import { Room, RoomDocument } from 'src/room/domain/entities/room.entity';
import { RoomRepository } from 'src/room/domain/repositories/room.repository';

@Injectable()
export class RoomMongoRepository implements RoomRepository{

  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
    const room = new this.roomModel(createRoomDto);
    return room.save();
  }

  findAll(): Promise<CreateRoomDto[]> {
    return this.roomModel.find();
  }

  findOne(id: string): Promise<CreateRoomDto | null> {
    return this.roomModel.findById(id).exec();
  }

  update(id: string, updateRoomDto: UpdateRoomDto): Promise<CreateRoomDto | null> {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto).exec();
  }

  remove(id: string): Promise<Room | null> {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
export { RoomRepository };

