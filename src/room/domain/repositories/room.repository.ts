import { CreateRoomDto } from "src/room/application/dto/create-room.dto";

export interface RoomRepository {
  create(createRoomDto: CreateRoomDto): Promise<CreateRoomDto>;
  findAll(): Promise<CreateRoomDto[]>;
  findOne(id: number): Promise<CreateRoomDto | null>;
  update(id: number, updateRoomDto: CreateRoomDto): Promise<CreateRoomDto | null>;
  remove(id: number): Promise<CreateRoomDto | null>;
}