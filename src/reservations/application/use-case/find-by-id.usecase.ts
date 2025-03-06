import { Inject, Injectable } from "@nestjs/common";
import { ReservationRepository, ReservationRepositoryToken } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class GetReservationByIdUseCase {
  constructor(
    @Inject(ReservationRepositoryToken)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async execute(userId: string): Promise<any> {
    return this.reservationRepository.findById(userId);
  }
}