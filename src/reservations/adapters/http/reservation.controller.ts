import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ReservationDTO } from "src/reservations/application/dtos/create-reservation.dto";
import { CancelReservationUseCase } from "src/reservations/application/use-case/cancel-reservation.usecase";
import { CreateReservationUseCase } from "src/reservations/application/use-case/create-reservation.usecase";
import { GetReservationByIdUseCase } from "src/reservations/application/use-case/find-by-id.usecase";
import { GetReservationsByRoomIdAndDateUseCase } from "src/reservations/application/use-case/find-reservation-by-room-id-and-date-usecase";
import { GetReservationsByRoomIdUseCase } from "src/reservations/application/use-case/find-reservation-by-room-id.usecase";
import { GetReservationsByUserIdAndDateUseCase } from "src/reservations/application/use-case/find-reservation-by-user-id-and-date.usecase";
import { GetReservationsByUserIdUseCase } from "src/reservations/application/use-case/find-reservation-by-user-id.usecase";
import { UpdateReservationUseCase } from "src/reservations/application/use-case/update-reservation.usecase";
@Controller('reservation')
export class ReservationController {
 constructor (
  private readonly getReservationByIdUseCase: GetReservationByIdUseCase,
  private readonly getReservationsByRoomIdUseCase: GetReservationsByRoomIdUseCase,
  private readonly getReservationsByUserIdUseCase: GetReservationsByUserIdUseCase,
  private readonly getReservationByRoomIdAndDateUseCase: GetReservationsByRoomIdAndDateUseCase,
  private readonly getReservationByUserIdAndDateUseCase: GetReservationsByUserIdAndDateUseCase,
  private readonly createReservationUseCase: CreateReservationUseCase,
  private readonly updateReservationUseCase: UpdateReservationUseCase,
  private readonly cancelReservationUseCase: CancelReservationUseCase
 ) {}

  @Get(':reservationId')
  getReservationById(@Param('reservationId') reservationId: string) {
    return this.getReservationByIdUseCase.execute(reservationId);
  } 
  
  @Get(':roomId')
  getReservationsByRoomId(@Param('roomId') roomId: string) {
    return this.getReservationsByRoomIdUseCase.execute(roomId);
  }

  @Get(':userId')
  getReservationsByUserId(@Param('userId') userId: string) {
    return this.getReservationsByUserIdUseCase.execute(userId);
  }

  @Get(':roomId/:dateFrom/:dateTo')
  getReservationsByRoomIdAndDate(
    @Param('roomId') roomId: string,
    @Param('dateFrom') dateFrom: string,
    @Param('dateTo') dateTo: string,
  ) {
    return this.getReservationByRoomIdAndDateUseCase.execute(roomId, new Date(dateFrom), new Date(dateTo));
  }

  @Get(':userId/:dateFrom/:dateTo')
  getReservationsByUserIdAndDate(
    @Param('userId') userId: string,
    @Param('dateFrom') dateFrom: string,
    @Param('dateTo') dateTo: string,
  ) {
    return this.getReservationByUserIdAndDateUseCase.execute(userId, new Date(dateFrom), new Date(dateTo));
  }

  @Post()
  createReservation(@Body() createReservationDTO: ReservationDTO) {
    return this.createReservationUseCase.execute(createReservationDTO);
  }

  @Put(':reservationId')
  updateReservation(@Param('reservationId') reservationId: string, @Body() updateReservationDTO: ReservationDTO) {
    return this.updateReservationUseCase.execute(reservationId, updateReservationDTO);
  }

  @Put('/cancel/:reservationId')
  cancelReservation(@Param('reservationId') reservationId: string) {
    return this.cancelReservationUseCase.execute(reservationId);
  }

}
