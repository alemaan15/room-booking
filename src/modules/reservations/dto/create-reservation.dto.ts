import { IsDateString, IsMongoId, IsNotEmpty, isString } from "class-validator";

export class CreateReservationDto {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsMongoId()
    @IsNotEmpty()
    roomId: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: string

    @IsDateString()
    @IsNotEmpty()
    endDate: string;
}
