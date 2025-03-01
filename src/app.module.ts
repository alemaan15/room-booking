import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservations/reservation.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/room-booking'),
    RoomModule,
    ReservationModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
