import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type RoomDocument = Room & Document;

@Schema()
export class Room extends Document {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true })
  roomNumber: number;

  @Prop({ required: true })
  roomFloor: number;

  @Prop({ required: true })
  roomType: RoomType;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  status: RoomStatus;

  description: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

export enum RoomType {
  STANDARD = 'standard',
  DELUXE = 'deluxe',
  SUITE = 'suite',
}

export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
  UNAVAILABLE = 'unavailable',
}
