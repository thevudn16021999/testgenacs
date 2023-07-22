import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clone } from 'lodash';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PermissionApiService } from 'src/app/modules/@core/api-services/permission/permission.api-service';
import { UpsertUserDto } from 'src/app/modules/@core/api-services/user/user-create.dto';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';

@Component({
    selector: 'app-user-update-popup',
    templateUrl: './update-popup.component.html',
    styleUrls: ['./update-popup.component.scss'],
})
export class UpdatePopupComponent implements OnInit {
    userDto: UpsertUserDto;
    formGroup!: FormGroup;
    roles: SelectItem[] = [];

    constructor(
        private readonly permissionApiService: PermissionApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        this.userDto = clone(this.config.data) as UpsertUserDto;
        this.formGroup = this.buildForm(this.userDto);
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
        if (formVal.password && formVal.password !== formVal.confirmPassword) {
            return;
        }
        this.dialogRef.close({
            ...formVal,
            _id: formVal.username,
            roles: formVal.roles.join(','),
        });
    }

    buildForm(userDto: UpsertUserDto): FormGroup {
        const fg = new FormGroup({
            username: new FormControl(userDto._id, [Validators.required]),
            roles: new FormControl(userDto.roles.split(','), [
                Validators.required,
            ]),
            password: new FormControl(undefined),
            confirmPassword: new FormControl(undefined),
        });
        fg.controls.username.disable();
        return fg;
    }
}
