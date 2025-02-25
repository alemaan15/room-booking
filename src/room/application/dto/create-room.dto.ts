import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { RoomStatus, RoomType } from "src/room/domain/entities/room.entity";

export class CreateRoomDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  roomNumber: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  roomFloor: number;

  @IsEnum(RoomType)
  @IsNotEmpty()
  roomType: RoomType; 

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  capacity: number;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsEnum(RoomStatus)
  @IsNotEmpty()
  status: RoomStatus; 

  @IsString()
  @IsOptional()
  description?: string;
}
