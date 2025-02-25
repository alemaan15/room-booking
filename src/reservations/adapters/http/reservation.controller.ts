import { Controller } from "@nestjs/common";
import { ReservationService } from "../database/reservation.service";

@Controller('reservation')
export class ReservationController {
 constructor (private readonly reservationService: ReservationService) {}
}
