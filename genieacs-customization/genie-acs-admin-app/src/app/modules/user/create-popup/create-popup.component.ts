import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PermissionApiService } from 'src/app/modules/@core/api-services/permission/permission.api-service';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

@Component({
    selector: 'app-user-create-popup',
    templateUrl: './create-popup.component.html',
    styleUrls: ['./create-popup.component.scss'],
})
export class CreatePopupComponent implements OnInit {
    formGroup!: FormGroup;
    roles: SelectItem[] = [];

    constructor(
        private readonly permissionApiService: PermissionApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        console.log(Object.keys(ResourceAccessLevels));
        this.formGroup = this.buildForm();
    }
    ngOnInit(): void {
        this.permissionApiService
            .getRoleNames$()
            .subscribe(
                (roles) =>
                    (this.roles = roles.map((i) => ({ label: i, value: i })))
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
        const formVal = this.formGroup.getRawValue();
        if (formVal.password !== formVal.confirmPassword) {
            return;
        }
        this.dialogRef.close({
            ...formVal,
            _id: formVal.username.toLocaleLowerCase(),
            roles: formVal.roles.join(','),
        });
    }

    buildForm(): FormGroup {
        const fg = new FormGroup({
            username: new FormControl('', [Validators.required]),
            roles: new FormControl(undefined, [Validators.required]),
            password: new FormControl(undefined, [Validators.required]),
            confirmPassword: new FormControl(undefined, [Validators.required]),
        });
        return fg;
    }
}
