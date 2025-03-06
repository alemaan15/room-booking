import { Inject, Injectable } from "@nestjs/common";
import { RoomRepository, RoomRepositoryToken } from "src/room/domain/repositories/room.repository";

@Injectable()
export class GetRoomByIdUseCase {
  constructor(
    @Inject(RoomRepositoryToken)
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(id: string) {
    return this.roomRepository.findOne(id);
  }
}