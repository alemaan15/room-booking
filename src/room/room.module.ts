import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './domain/entities/room.entity';
import { RoomController } from './adapters/http/room.controller';
import { RoomMongoRepository } from './adapters/database/room.mongo.repository';
import { Room } from './domain/entities/room.entity';
@Module({
  controllers: [RoomController],
  providers: [RoomMongoRepository],
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
