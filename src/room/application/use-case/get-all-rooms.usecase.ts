import { Inject, Injectable } from "@nestjs/common";
import { RoomRepository, RoomRepositoryToken } from "src/room/domain/repositories/room.repository";

@Injectable()
export class GetAllRoomsUseCase {
  constructor(
    @Inject(RoomRepositoryToken)
    private readonly roomRepository: RoomRepository
  ) {}

  async execute() {
    return this.roomRepository.findAll();
  }
}