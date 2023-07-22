import { DeviceTaskStatuses } from 'src/app/modules/@shared/enums/entity-statuses.enum';
import { DeviceTaskNames } from 'src/app/modules/@shared/enums/task-types.enum';

export interface FilePushingRequest {
    device: string;
    fileName: string;
    fileType: string;
    name: DeviceTaskNames.Download;
    status: DeviceTaskStatuses.Pending;
}
