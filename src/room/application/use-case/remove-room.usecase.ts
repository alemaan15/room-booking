import { Inject, Injectable } from "@nestjs/common";
import { Room } from "src/room/domain/entities/room.entity";
import { RoomRepository, RoomRepositoryToken } from "src/room/domain/repositories/room.repository";

@Injectable()
export class RemoveRoomUseCase {
  constructor(
    @Inject(RoomRepositoryToken)
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(id: string): Promise<Room | null> {
    return this.roomRepository.remove(id);
  }
}