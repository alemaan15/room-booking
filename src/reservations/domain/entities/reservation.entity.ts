import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Room', required: true }) 
  roomId: Types.ObjectId; // Referencia a Room

  @Prop({ required: true })
  userId: string; // UUID del usuario (viene del servicio de autenticación)

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ type: String, enum: ReservationStatus, default: ReservationStatus.PENDING }) 
  status: ReservationStatus
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

