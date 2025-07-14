import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configurationMongo } from './configuration/configuration-mongo';
import { AuthModule } from './modules/auth/auth.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RoomModule } from './modules/room/room.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      isGlobal: true,
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongo.MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    RoomModule,
    UsersModule,
    ReservationsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
