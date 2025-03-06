import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './domain/entities/room.entity';
import { RoomController } from './adapters/http/room.controller';
import { RoomMongoRepository } from './adapters/database/room.mongo.repository';
import { Room } from './domain/entities/room.entity';
import { CreateRoomUseCase } from './application/use-case/create-room.usecase';
import { GetAllRoomsUseCase } from './application/use-case/get-all-rooms.usecase';
import { GetRoomByIdUseCase } from './application/use-case/get-room-by-id.usecase';
import { RemoveRoomUseCase } from './application/use-case/remove-room.usecase';
import { UpdateRoomUseCase } from './application/use-case/update-room.usecase';
import { RoomRepositoryToken } from './domain/repositories/room.repository';
@Module({
  controllers: [RoomController],
  providers: [
    CreateRoomUseCase,
    GetAllRoomsUseCase,
    GetRoomByIdUseCase,
    RemoveRoomUseCase,
    UpdateRoomUseCase,
    {
      provide: RoomRepositoryToken,
      useClass: RoomMongoRepository
    }
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,  
      }
    ])
  ]
})
export class RoomModule {}
