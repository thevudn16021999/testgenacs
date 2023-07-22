import { ProvisionTypes } from 'src/app/modules/@shared/enums/provision-types.enum';

export interface UpsertPresetRequest {
    _id: string;
    channel: string;
    events: string;
    weight: number;
    precondition: string;
    provision: ProvisionTypes;
    provisionArgs: string;
    schedule: string;
}
