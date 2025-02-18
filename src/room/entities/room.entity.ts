import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  id?: string;
  roomNumber: number;
  roomFloor: number;
  roomType: RoomType;
  capacity: number;
  price: number;
  status: RoomStatus;
  description: string;
  hotelIds: string[];
}

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
