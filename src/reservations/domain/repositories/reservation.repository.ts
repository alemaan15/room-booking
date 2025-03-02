import { ReservationDTO } from "src/reservations/application/dtos/create-reservation.dto";
import { Reservation } from "../entities/reservation.entity";

export interface ReservationRepository {
  findById(reservationId: string): Promise<Reservation>;
  findByRoomId(roomId: string): Promise<Reservation[]>;
  findByUserId(userId: string): Promise<Reservation[]>;
  findByRoomIdAndDate(roomId: string, dateFrom: Date, dateTo: Date): Promise<Reservation[]>;
  findByUserIdAndDate(userId: string, dateFrom: Date, dateTo: Date): Promise<Reservation[]>;
  createReservation(reservationDTO: ReservationDTO): Promise<Reservation>;
  updateReservation(reservationId: string, reservationDTO: ReservationDTO): Promise<Reservation>;
  cancelReservation(reservationId: string): Promise<void>;  
}