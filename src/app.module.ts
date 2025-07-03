import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoomModule } from './modules/room/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurationMongo } from './configuration/configuration-mongo';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      isGlobal: true,
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/roomBooking', {}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongo.MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    RoomModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
