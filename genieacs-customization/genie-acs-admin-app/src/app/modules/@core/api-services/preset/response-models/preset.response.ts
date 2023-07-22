import { ProvisionTypes } from 'src/app/modules/@shared/enums/provision-types.enum';

export interface PresetResponse {
    _id: string;
    channel: string;
    events: string;
    precondition: string;
    provision: ProvisionTypes;
    provisionArgs: string;
    weight: number;
    schedule: string;
}
