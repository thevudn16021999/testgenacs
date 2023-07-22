import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as appConfig from '../app-config.json';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { DeviceLog } from 'src/schemas/device-log.schema';
import { Connection, Model } from 'mongoose';
import { get } from 'lodash';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(DeviceLog.name) private deviceLogModel: Model<DeviceLog>,
    @InjectConnection() private connection: Connection,
  ) {}
  private readonly logger = new Logger(TasksService.name);
  private readonly dayInMS = 3600 * 1000 * 24;

  @Cron(appConfig.interval)
  async handleCronAsync() {
    this.logger.log('Job Running....', appConfig.interval);

    const currentDate = new Date();
    const fourteenDaysInPast = new Date(
      currentDate.getTime() - 14 * this.dayInMS,
    );
    await this.deleteOfflineDevicesAsync(fourteenDaysInPast);

    const daysInPast = new Date(
      currentDate.getTime() - appConfig.retentionInDays * this.dayInMS,
    );
    await this.deleteLogsFromAsync(daysInPast);

    this.logger.log('Getting logs from devices....');
    const devices = await this.connection
      .collection('devices')
      .find({ VirtualParameters: { $exists: true } })
      .toArray();

    const deviceLogs = devices.map((d) => {
      return {
        DeviceId: d._id + '',
        TxThroughput: +get(d.VirtualParameters.TxThroughput, '_value', 0),
        RxThroughput: +get(d.VirtualParameters.RxThroughput, '_value', 0),
        BytesReceived:
          +get(d.VirtualParameters.BytesReceived, '_value', 0) / 1048576,
        BytesSent: +get(d.VirtualParameters.BytesSent, '_value', 0) / 1048576,
        ClientConnectionNumber: +get(
          d.VirtualParameters.ClientConnectionNumber,
          '_value',
          0,
        ),
        Created: currentDate.getTime(),
      } as DeviceLog;
    });

    this.logger.log('Got logs from devices');
    this.logger.log('Storing logs to DB');
    await this.deviceLogModel.insertMany(deviceLogs);
    this.logger.log('Stored logs to DB');
  }

  async deleteOfflineDevicesAsync(offlineFrom: Date) {
    this.logger.log(
      'Deleting offline devices & logs from: ' + offlineFrom.toISOString(),
    );
    const devices = await this.connection
      .collection('devices')
      .find(
        {},
        {
          projection: {
            _id: 1,
            _lastInform: 1,
          },
        },
      )
      .toArray();

    const outdatedDeviceIds = [];
    devices.forEach((d) => {
      const isOudated = d._lastInform < offlineFrom;
      if (!isOudated) return;
      outdatedDeviceIds.push(d._id);
    });

    const [deletedDeviceResult, deletedLogResult] = await Promise.all([
      this.connection
        .collection('devices')
        .deleteMany({ _id: { $in: outdatedDeviceIds } }),
      this.connection
        .collection('devicelogs')
        .deleteMany({ DeviceId: { $in: outdatedDeviceIds } }),
    ]);
    this.logger.log(
      'Deleted device count: ' + deletedDeviceResult.deletedCount,
    );
    this.logger.log('And deleted log count: ' + deletedLogResult.deletedCount);
  }

  async deleteLogsFromAsync(from: Date) {
    this.logger.log('Deleting log from: ' + from.toISOString());
    const deletedLogResult = await this.connection
      .collection('devicelogs')
      .deleteMany({
        Created: { $lte: from.getTime() },
      });
    this.logger.log('Deleted log count: ' + deletedLogResult.deletedCount);
  }
}
