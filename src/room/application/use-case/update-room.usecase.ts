import { Inject, Injectable } from "@nestjs/common";
import { RoomRepository, RoomRepositoryToken } from "src/room/domain/repositories/room.repository";
import { CreateRoomDto } from "../dto/create-room.dto";
import { Room } from "src/room/domain/entities/room.entity";
import { UpdateRoomDto } from "../dto/update-room.dto";

@Injectable()
export class UpdateRoomUseCase {
  constructor(
    @Inject(RoomRepositoryToken)
    private readonly roomRepository: RoomRepository
  ) {}
  async execute(id:string, roomData: UpdateRoomDto): Promise<UpdateRoomDto | null> {
    return this.roomRepository.update(id, roomData);
    
  }
}