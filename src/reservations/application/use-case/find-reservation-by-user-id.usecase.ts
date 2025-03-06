import { Inject, Injectable } from "@nestjs/common";
import { Reservation } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository, ReservationRepositoryToken } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class GetReservationsByUserIdUseCase {
  constructor(
    @Inject(ReservationRepositoryToken)
    private readonly reservationRepository: ReservationRepository
  ) {}

  async execute(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.findByUserId(userId);
  }
}