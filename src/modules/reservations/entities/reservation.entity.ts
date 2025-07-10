import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Room } from "src/modules/room/entities/room.entity";
import { User } from "src/modules/users/entities/user.entity";

export type ReservationDocument = Reservation & Document

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Reservation {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
    roomId: Types.ObjectId;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: false })
    isCancelled: boolean;

    @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
    status: string
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
