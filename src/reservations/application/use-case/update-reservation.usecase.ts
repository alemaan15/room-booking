import { Inject, Injectable } from "@nestjs/common";
import { Reservation } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository, ReservationRepositoryToken } from "src/reservations/domain/repositories/reservation.repository";
import { ReservationDTO } from "../dtos/create-reservation.dto";

@Injectable()
export class UpdateReservationUseCase {
  constructor(
    @Inject(ReservationRepositoryToken)
    private readonly reservationRepository: ReservationRepository) {}

  async execute(reservationId: string, reservationDTO: ReservationDTO): Promise<Reservation> {
    return this.reservationRepository.updateReservation(reservationId, reservationDTO);
  }
}