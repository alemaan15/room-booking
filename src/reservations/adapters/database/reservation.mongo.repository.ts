import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReservationDTO } from "src/reservations/application/dtos/create-reservation.dto";
import { Reservation, ReservationDocument, ReservationStatus } from "src/reservations/domain/entities/reservation.entity";
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

  async updateReservation(reservationId: string, reservationDTO: ReservationDTO): Promise<Reservation> {
    const newReservation = await this.reservationModel.findByIdAndUpdate(reservationId, reservationDTO, { new: true }).exec();

    if (!newReservation) {
      throw new Error('Reservation not found');
    }

    return newReservation;
  }

  async cancelReservation(reservationId: string): Promise<void> {
    let reservation = this.reservationModel.findById(reservationId).exec();

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }
    
    await this.reservationModel.findByIdAndUpdate(
      reservationId,
      { status: ReservationStatus.CANCELLED },
      { new: true },
    ).exec();
  }
}