import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReservationDTO } from "src/reservations/application/dtos/create-reservation.dto";
import { Reservation, ReservationDocument } from "src/reservations/domain/entities/reservation.entity";
import { ReservationRepository } from "src/reservations/domain/repositories/reservation.repository";

@Injectable()
export class ReservationMongoRepository implements ReservationRepository {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  async findByRoomId(roomId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ roomId }).exec();
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ userId }).exec();
  }

  async findByRoomIdAndDate(roomId: string, dateFrom: Date, dateTo: Date): Promise<Reservation[]> {
    return this.reservationModel.find({
      roomId,
      startTime: { $gte: dateFrom },
      endTime: { $lte: dateTo },
    }).exec();
  }

  async findByUserIdAndDate(userId: string, dateFrom: Date, dateTo: Date): Promise<Reservation[]> {
    return this.reservationModel.find({
      userId,
      startTime: { $gte: dateFrom },
      endTime: { $lte: dateTo },
    }).exec();
  }

  async createReservation(reservationDTO: ReservationDTO): Promise<Reservation> {
    const reservation = new this.reservationModel(reservationDTO);
    return reservation.save();
  }
}