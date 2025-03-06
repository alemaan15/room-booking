import { Inject, Injectable } from "@nestjs/common";
import { Reservation } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository, ReservationRepositoryToken } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class GetReservationsByUserIdAndDateUseCase {
  constructor(
    @Inject(ReservationRepositoryToken)
    private readonly reservationRepository: ReservationRepository) {}

  async execute(userId: string, dateFrom: Date, dateTo: Date): Promise<Reservation[]> {
    return this.reservationRepository.findByUserIdAndDate(userId, dateFrom, dateTo);
  }
}