import { Inject, Injectable } from "@nestjs/common";
import { ReservationRepository, ReservationRepositoryToken } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class CancelReservationUseCase {
  constructor(
   @Inject(ReservationRepositoryToken)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async execute(reservationId: string): Promise<void> {
    // Implement this method
  }
}