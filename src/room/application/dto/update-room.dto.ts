import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsInt, IsPositive, IsOptional, Min, IsEnum, IsString } from 'class-validator';
import { RoomType, RoomStatus } from 'src/room/domain/entities/room.entity';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsInt()
  @IsPositive()
  @IsOptional()
  roomNumber?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  roomFloor?: number;

  @IsEnum(RoomType)
  @IsOptional()
  roomType?: RoomType;

  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @IsPositive()
  @IsOptional()
  price?: number;

  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;

  @IsString()
  @IsOptional()
  description?: string;
}
