import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UpsertPresetRequest } from 'src/app/modules/@core/api-services/preset/request-models/preset.request';
import { ProvisionApiService } from 'src/app/modules/@core/api-services/provision/provision.api-service';
import { ProvisionTypes } from 'src/app/modules/@shared/enums/provision-types.enum';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

@Component({
    selector: 'app-preset-create-popup',
    templateUrl: './create-popup.component.html',
    styleUrls: ['./create-popup.component.scss'],
})
export class CreatePopupComponent implements OnInit {
    formGroup!: FormGroup;
    provisionNames: string[] = [];

    constructor(
        private readonly provisionApiService: ProvisionApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        console.log(Object.keys(ProvisionTypes));
        this.formGroup = this.buildForm();
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

    buildForm(): FormGroup {
        const fg = new FormGroup({
            _id: new FormControl('', [Validators.required]),
            channel: new FormControl('', [Validators.required]),
            weight: new FormControl(0, [Validators.required]),
            schedule: new FormControl('', [Validators.required]),
            events: new FormControl('', [Validators.required]),
            precondition: new FormControl('', [Validators.required]),
            provision: new FormControl('', [Validators.required]),
            provisionArgs: new FormControl('', [Validators.required]),
        });
        return fg;
    }
}
