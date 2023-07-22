import { ResourceNames } from 'src/app/modules/@shared/enums/resource-names.enum';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

export interface PermissionRequest {
    access: ResourceAccessLevels;
    resource: ResourceNames;
    role: string;
    filter: string;
    validate: string;
}
