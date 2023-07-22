import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clone } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PermissionApiService } from 'src/app/modules/@core/api-services/permission/permission.api-service';
import { ProvisionResponse } from 'src/app/modules/@core/api-services/provision/response-models/provision.response';

@Component({
    selector: 'app-provision-upsert-popup',
    templateUrl: './upsert-popup.component.html',
    styleUrls: ['./upsert-popup.component.scss'],
})
export class UpsertPopupComponent {
    provision: ProvisionResponse;
    formGroup!: FormGroup;
    roles: string[] = [];

    constructor(
        private readonly permissionApiService: PermissionApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        this.provision = clone(this.config.data) as ProvisionResponse;
        this.formGroup = this.buildForm(this.provision);
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
        const formVal = this.formGroup.getRawValue();
        this.dialogRef.close(formVal);
    }

    buildForm(provision: ProvisionResponse): FormGroup {
        const fg = new FormGroup({
            _id: new FormControl(provision._id, [Validators.required]),
            script: new FormControl(provision.script, [Validators.required]),
        });
        return fg;
    }
}
