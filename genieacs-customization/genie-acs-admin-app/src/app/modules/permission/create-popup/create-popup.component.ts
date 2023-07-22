import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PermissionApiService } from 'src/app/modules/@core/api-services/permission/permission.api-service';
import { PermissionRequest } from 'src/app/modules/@core/api-services/permission/request-models/permission.request';
import { ResourceNames } from 'src/app/modules/@shared/enums/resource-names.enum';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

@Component({
    selector: 'app-permission-create-popup',
    templateUrl: './create-popup.component.html',
    styleUrls: ['./create-popup.component.scss'],
})
export class CreatePopupComponent implements OnInit {
    formGroup!: FormGroup;
    roles: string[] = [];
    filterRoles: string[] = [];
    resources = Object.values(ResourceNames) as string[];
    accessLevels = [
        {
            key: 'Count',
            value: ResourceAccessLevels.Count,
        },
        {
            key: 'Read',
            value: ResourceAccessLevels.Read,
        },
        ,
        {
            key: 'Write',
            value: ResourceAccessLevels.Write,
        },
    ];

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
            .subscribe((roles) => (this.roles = roles));
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
        const rawFormVal = this.formGroup.getRawValue();
        const formVal = {
            ...rawFormVal,
            access: rawFormVal.access.value as ResourceAccessLevels,
        } as PermissionRequest;
        this.dialogRef.close(formVal);
    }

    buildForm(): FormGroup {
        const fg = new FormGroup({
            role: new FormControl('', [Validators.required]),
            resource: new FormControl(ResourceNames.Config, [
                Validators.required,
            ]),
            access: new FormControl(this.accessLevels[0], [
                Validators.required,
            ]),
            filter: new FormControl(''),
            validate: new FormControl(''),
            isApi: new FormControl(false),
        });
        return fg;
    }

    onRoleSearch(event: any) {
        const loweredQuery = (event.query as string).toLocaleLowerCase();
        this.filterRoles = this.roles.filter((r) =>
            r.toLocaleLowerCase().includes(loweredQuery)
        );
    }
}
