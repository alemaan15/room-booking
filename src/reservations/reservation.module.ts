import { Module } from "@nestjs/common";
import { ReservationController } from "./adapters/http/reservation.controller";
import { ReservationService } from "./adapters/database/reservation.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Reservation, ReservationSchema } from "./domain/entities/reservation.entity";

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports: [ MongooseModule.forFeature([
        {
          name: Reservation.name,
          schema: ReservationSchema,  
        }
      ])
    ]
})
export class ReservationModule {}