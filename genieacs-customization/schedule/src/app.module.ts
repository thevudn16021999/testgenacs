import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from 'src/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as appConfig from '../app-config.json';
import { DeviceLog, DeviceLogSchema } from 'src/schemas/device-log.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(appConfig.mongodbUrl),
    MongooseModule.forFeature([
      { name: DeviceLog.name, schema: DeviceLogSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
