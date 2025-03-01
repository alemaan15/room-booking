import { CreateRoomDto } from "src/room/application/dto/create-room.dto";

export interface RoomRepository {
  create(createRoomDto: CreateRoomDto): Promise<CreateRoomDto>;
  findAll(): Promise<CreateRoomDto[]>;
  findOne(id: string): Promise<CreateRoomDto | null>;
  update(id: string, updateRoomDto: CreateRoomDto): Promise<CreateRoomDto | null>;
  remove(id: string): Promise<CreateRoomDto | null>;
}