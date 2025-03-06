import { Inject, Injectable } from "@nestjs/common";
import { RoomRepository, RoomRepositoryToken } from "src/room/domain/repositories/room.repository";
import { CreateRoomDto } from "../dto/create-room.dto";

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject(RoomRepositoryToken)
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(createRoomDto: CreateRoomDto): Promise<CreateRoomDto> {
    return this.roomRepository.create(createRoomDto);
  }
} 