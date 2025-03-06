import { Inject, Injectable } from "@nestjs/common";
import { Reservation } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository, ReservationRepositoryToken } from "src/reservations/domain/repositories/reservation.repository";
import { ReservationDTO } from "../dtos/create-reservation.dto";

@Injectable()
export class CreateReservationUseCase {
  constructor(
    @Inject(ReservationRepositoryToken)
    private readonly reservationRepository: ReservationRepository) {}

  async execute(createReservationDto: ReservationDTO): Promise<Reservation> {
    return this.reservationRepository.createReservation(createReservationDto);
  }
}