import { Injectable } from "@nestjs/common";
import { ReservationRepository } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class CancelReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async execute(reservationId: string): Promise<void> {
    // Implement this method
  }
}