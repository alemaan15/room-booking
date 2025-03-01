import { Injectable } from "@nestjs/common";
import { Reservation } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class GetReservationsByUserIdUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.findByUserId(userId);
  }
}