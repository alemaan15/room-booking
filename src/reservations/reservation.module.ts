import { Module } from "@nestjs/common";
import { ReservationController } from "./adapters/http/reservation.controller";
import { ReservationMongoRepository } from "./adapters/database/reservation.mongo.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Reservation, ReservationSchema } from "./domain/entities/reservation.entity";
import { GetReservationsByRoomIdAndDateUseCase } from "./application/use-case/find-reservation-by-room-id-and-date-usecase";
import { GetReservationByIdUseCase } from "./application/use-case/find-by-id.usecase";
import { GetReservationsByRoomIdUseCase } from "./application/use-case/find-reservation-by-room-id.usecase";
import { GetReservationsByUserIdAndDateUseCase } from "./application/use-case/find-reservation-by-user-id-and-date.usecase";
import { GetReservationsByUserIdUseCase } from "./application/use-case/find-reservation-by-user-id.usecase";
import { UpdateReservationUseCase } from "./application/use-case/update-reservation.usecase";
import { CancelReservationUseCase } from "./application/use-case/cancel-reservation.usecase";
import { CreateReservationUseCase } from "./application/use-case/create-reservation.usecase";
import { ReservationRepositoryToken } from "./domain/repositories/reservation.repository";

@Module({
  controllers: [ReservationController],
  providers: [
    GetReservationByIdUseCase,
    GetReservationsByRoomIdUseCase,
    GetReservationsByUserIdUseCase,
    GetReservationsByRoomIdAndDateUseCase,
    GetReservationsByUserIdAndDateUseCase,
    UpdateReservationUseCase,
    CancelReservationUseCase,
    CreateReservationUseCase,
    {
      provide: ReservationRepositoryToken,
      useClass: ReservationMongoRepository
    }
  ],
  imports: [ MongooseModule.forFeature([
        {
          name: Reservation.name,
          schema: ReservationSchema,  
        }
      ])
    ]
})
export class ReservationModule {}