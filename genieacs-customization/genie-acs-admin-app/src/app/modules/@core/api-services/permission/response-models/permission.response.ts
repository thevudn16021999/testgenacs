import { ResourceNames } from 'src/app/modules/@shared/enums/resource-names.enum';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

export interface PermissionResponse {
    role: string;
    resource: ResourceNames;
    access: ResourceAccessLevels;
    validate: string;
    filter: string;
}
