export class DeviceSummaryDto {
  'DeviceID.ID': DeviceIdDto;

  constructor() {
    this['DeviceID.ID'] = undefined;
  }
}

export interface DeviceIdDto {
  value: string[];
  valueTimestamp: number;
  writable: boolean;
  writableTimestamp: number;
  object: boolean;
  objectTimestamp: number;
}
