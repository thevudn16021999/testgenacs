export class DeviceLogDto {
  Id: string;
  DeviceId: string;
  TxThroughput: number;
  RxThroughput: number;
  BytesReceived: number;
  BytesSent: number;
  Created: Date;

  constructor() {
    this.DeviceId = '';
  }
}
