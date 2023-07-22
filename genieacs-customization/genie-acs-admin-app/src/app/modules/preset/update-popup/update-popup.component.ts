import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clone } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UpsertPresetRequest } from 'src/app/modules/@core/api-services/preset/request-models/preset.request';
import { ProvisionApiService } from 'src/app/modules/@core/api-services/provision/provision.api-service';
import { ProvisionTypes } from 'src/app/modules/@shared/enums/provision-types.enum';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

@Component({
    selector: 'app-preset-update-popup',
    templateUrl: './update-popup.component.html',
    styleUrls: ['./update-popup.component.scss'],
})
export class UpdatePopupComponent implements OnInit {
    presetDto: UpsertPresetRequest;
    formGroup!: FormGroup;
    provisionNames: string[] = [];

    constructor(
        private readonly provisionApiService: ProvisionApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        this.presetDto = clone(this.config.data) as UpsertPresetRequest;
        this.formGroup = this.buildForm(this.presetDto);
    }
    ngOnInit(): void {
        this.provisionApiService
            .get$(0, 1000)
            .subscribe(
                (provisions) =>
                    (this.provisionNames = provisions.Items.map((p) => p._id))
            );
    }

    onCancelBtnClicked(e: any) {
        e.preventDefault();
        this.dialogRef.close();
    }

    onSaveBtnClicked(e: any) {
        e.preventDefault();
        if (this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        const formVal = this.formGroup.getRawValue() as UpsertPresetRequest;
        this.dialogRef.close(formVal);
    }

    buildForm(item: UpsertPresetRequest): FormGroup {
        const fg = new FormGroup({
            _id: new FormControl(item._id, [Validators.required]),
            channel: new FormControl(item.channel, [Validators.required]),
            weight: new FormControl(item.weight, [Validators.required]),
            schedule: new FormControl(item.schedule, [Validators.required]),
            events: new FormControl(item.events, [Validators.required]),
            precondition: new FormControl(item.precondition, [
                Validators.required,
            ]),
            provision: new FormControl(item.provision, [Validators.required]),
            provisionArgs: new FormControl(item.provisionArgs, [
                Validators.required,
            ]),
        });
        fg.controls._id.disable();
        return fg;
    }
}
