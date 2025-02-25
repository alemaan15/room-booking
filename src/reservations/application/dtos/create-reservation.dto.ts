import { IsDate, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { ReservationStatus } from "src/reservations/domain/entities/reservation.entity";

export class ReservationDTO{
  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  
}