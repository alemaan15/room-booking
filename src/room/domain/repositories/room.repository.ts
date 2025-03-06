import { CreateRoomDto } from "src/room/application/dto/create-room.dto";
import { UpdateRoomDto } from "src/room/application/dto/update-room.dto";
import { Room } from "../entities/room.entity";

export const RoomRepositoryToken = Symbol('RoomRepositoryToken');
export interface RoomRepository {
  create(createRoomDto: CreateRoomDto): Promise<CreateRoomDto>;
  findAll(): Promise<CreateRoomDto[]>;
  findOne(id: string): Promise<CreateRoomDto | null>;
  update(id: string, updateRoomDto: UpdateRoomDto): Promise<UpdateRoomDto | null>;
  remove(id: string): Promise<Room | null>;
}