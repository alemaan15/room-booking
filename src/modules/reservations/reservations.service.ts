import { ConflictException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './entities/reservation.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    const { roomId, startDate, endDate } = createReservationDto

    //Check if the room is available in the given date range
    const overlappingReservations = await this.reservationModel.findOne({
      roomId: new Types.ObjectId(roomId),
      $or: [
        {
          startDate: { $lt: new Date(endDate) },
          endDate: { $gt: new Date(startDate) }
        }
      ]
    })

    if (overlappingReservations) {
      throw new ConflictException(`Room is not available for the selected dates`);
    }

    const createdReservation = new this.reservationModel(createReservationDto);
    return createdReservation.save();
  }

  async findAll() {
    return await this.reservationModel
      .find()
      .populate('userId')
      .populate('roomId');
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
