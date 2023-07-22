import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceLogDocument = HydratedDocument<DeviceLog>;

@Schema()
export class DeviceLog {
  @Prop()
  DeviceId: string;
  @Prop()
  TxThroughput: number;
  @Prop()
  RxThroughput: number;
  @Prop()
  BytesReceived: number;
  @Prop()
  BytesSent: number;
  @Prop()
  ClientConnectionNumber: number;
  @Prop()
  Created: number;
}

export const DeviceLogSchema = SchemaFactory.createForClass(DeviceLog);
