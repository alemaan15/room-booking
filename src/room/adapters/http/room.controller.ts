import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { RoomMongoRepository } from '../database/room.mongo.repository';
import { CreateRoomDto } from 'src/room/application/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/application/dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomMongoRepository: RoomMongoRepository) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
    return this.roomMongoRepository.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<CreateRoomDto[]> {
    return this.roomMongoRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateRoomDto | null>  {
    return this.roomMongoRepository.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto): Promise<CreateRoomDto | null> {
    return this.roomMongoRepository.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CreateRoomDto | null> {
    return this.roomMongoRepository.remove(+id);
  }
}
