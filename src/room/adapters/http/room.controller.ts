import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateRoomDto } from 'src/room/application/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/application/dto/update-room.dto';
import { CreateRoomUseCase } from 'src/room/application/use-case/create-room.usecase';
import { GetAllRoomsUseCase } from 'src/room/application/use-case/get-all-rooms.usecase';
import { GetRoomByIdUseCase } from 'src/room/application/use-case/get-room-by-id.usecase';
import { RemoveRoomUseCase } from 'src/room/application/use-case/remove-room.usecase';
import { UpdateRoomUseCase } from 'src/room/application/use-case/update-room.usecase';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';

@Controller('room')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly getAllRoomsUseCase: GetAllRoomsUseCase,
    private readonly getRoomByIdUseCase: GetRoomByIdUseCase,  
    private readonly updateRoomUseCase: UpdateRoomUseCase,
    private readonly deleteRoomUseCase: RemoveRoomUseCase,
  ) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
    return this.createRoomUseCase.execute(createRoomDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO): Promise<CreateRoomDto[]> {
    console.log(paginationDTO);
    return this.getAllRoomsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateRoomDto | null>  {
    return this.getRoomByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto): Promise<UpdateRoomDto | null> {
    return this.updateRoomUseCase.execute(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CreateRoomDto | null> {
    return this.deleteRoomUseCase.execute(id);
  }
}
