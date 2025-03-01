import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateRoomDto } from 'src/room/application/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/application/dto/update-room.dto';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import { RoomMongoRepository } from '../database/room.mongo.repository';

@Controller('room')
export class RoomController {
  constructor(private readonly roomMongoRepository: RoomMongoRepository) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
    return this.roomMongoRepository.create(createRoomDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO): Promise<CreateRoomDto[]> {
    console.log(paginationDTO);
    return this.roomMongoRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateRoomDto | null>  {
    return this.roomMongoRepository.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto): Promise<CreateRoomDto | null> {
    return this.roomMongoRepository.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CreateRoomDto | null> {
    return this.roomMongoRepository.remove(id);
  }
}
