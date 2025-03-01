import { Module } from "@nestjs/common";
import { ReservationController } from "./adapters/http/reservation.controller";
import { ReservationMongoRepository } from "./adapters/database/reservation.mongo.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Reservation, ReservationSchema } from "./domain/entities/reservation.entity";

@Module({
  controllers: [ReservationController],
  providers: [ReservationMongoRepository],
  imports: [ MongooseModule.forFeature([
        {
          name: Reservation.name,
          schema: ReservationSchema,  
        }
      ])
    ]
})
export class ReservationModule {}