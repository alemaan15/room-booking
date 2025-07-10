import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true })
  capacity: string

  @Prop({ required: true })
  pricePerNight: number

  @Prop({ default: true })
  isAvailable: boolean
}
export const RoomSchema = SchemaFactory.createForClass(Room);