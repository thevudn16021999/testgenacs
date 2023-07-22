import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clone } from 'lodash';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BaseConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/config.response';
import { PermissionApiService } from 'src/app/modules/@core/api-services/permission/permission.api-service';
import { ProvisionResponse } from 'src/app/modules/@core/api-services/provision/response-models/provision.response';

@Component({
    selector: 'app-version-upsert-popup',
    templateUrl: './upsert-popup.component.html',
    styleUrls: ['./upsert-popup.component.scss'],
})
export class UpsertPopupComponent {
    version: BaseConfigResponse;
    formGroup!: FormGroup;
    roles: string[] = [];

    constructor(
        private readonly permissionApiService: PermissionApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        this.version = clone(this.config.data) as BaseConfigResponse;
        console.log(this.version);
        this.formGroup = this.buildForm(this.version);
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

    buildForm(item: BaseConfigResponse): FormGroup {
        const fg = new FormGroup({
            _id: new FormControl(item._id, [Validators.required]),
            value: new FormControl(item.value, [Validators.required]),
        });
        return fg;
    }
}
