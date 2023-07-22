import { DeviceTaskStatuses } from 'src/app/modules/@shared/enums/entity-statuses.enum';
import { DeviceTaskNames } from 'src/app/modules/@shared/enums/task-types.enum';

export interface SettingDeviceTaskRequest {
    device: string;
    name: DeviceTaskNames;
    status: DeviceTaskStatuses;
    parameterValues: any;
}
