import { Injectable } from "@nestjs/common";
import { ReservationRepository } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class GetReservationsByUserIdUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async execute(userId: string): Promise<any> {
    return this.reservationRepository.findByUserId(userId);
  }
}