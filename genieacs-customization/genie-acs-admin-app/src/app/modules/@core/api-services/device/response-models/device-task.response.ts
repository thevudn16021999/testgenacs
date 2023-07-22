import { DeviceTaskStatuses } from 'src/app/modules/@shared/enums/entity-statuses.enum';

export interface DeviceTaskResponse {
    _id: string;
    status: DeviceTaskStatuses;
}

export interface DevicePropResponse {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}
