import { ReservationDTO } from "src/reservations/application/dtos/create-reservation.dto";

export interface ReservationRepository {
  findById(id: string): Promise<ReservationDTO>;
  create(data: ReservationDTO): Promise<ReservationDTO>;
}