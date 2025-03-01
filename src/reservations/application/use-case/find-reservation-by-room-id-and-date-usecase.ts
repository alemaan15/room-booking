import { Injectable } from "@nestjs/common";
import { Reservation } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class GetReservationsByRoomIdAndDateUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(roomId: string, dateFrom: Date, dateTo: Date): Promise<Reservation[]> {
    return this.reservationRepository.findByRoomIdAndDate(roomId, dateFrom, dateTo);
  }
}