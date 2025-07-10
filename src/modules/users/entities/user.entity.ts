import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6, maxlength: 20 })
    password: string;

    @Prop({ enum: ['admin', 'user', 'guest'], default: 'user' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}