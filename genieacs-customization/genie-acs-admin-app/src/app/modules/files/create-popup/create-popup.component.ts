import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { debounceTime } from 'rxjs';
import { FileRequest } from 'src/app/modules/@core/api-services/file/request-models/file.request';

@Component({
    selector: 'app-file-create-popup',
    templateUrl: './create-popup.component.html',
    styleUrls: ['./create-popup.component.scss'],
})
export class CreatePopupComponent {
    formGroup!: FormGroup;
    fileTypes = [
        '1 Firmware Upgrade Image',
        '2 Web Content',
        '3 Vendor Configuration File',
        '4 Tone File',
        '5 Ringer File',
    ];
    filteredFileTypes: string[] = [];

    constructor(
        private readonly dialogRef: DynamicDialogRef,
        private readonly config: DynamicDialogConfig
    ) {
        this.formGroup = this.buildForm();
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
        const rawValues = this.formGroup.getRawValue();
        const file = rawValues.file as File;
        const fileReq = {
            ...rawValues,
            fileName: file.name,
        } as FileRequest;
        this.dialogRef.close(fileReq);
    }

    buildForm(item?: FileRequest): FormGroup {
        const fg = new FormGroup({
            fileType: new FormControl(item?.fileType, [Validators.required]),
            oui: new FormControl(item?.oui, [Validators.required]),
            productClass: new FormControl(item?.productClass, [
                Validators.required,
            ]),
            version: new FormControl(item?.version, [Validators.required]),
            file: new FormControl(undefined, [Validators.required]),
        });

        fg.controls.fileType.statusChanges
            .pipe(debounceTime(500))
            .subscribe(() => {
                const isWebContent =
                    fg.controls.fileType.value === this.fileTypes[1];
                const validators = isWebContent ? [] : [Validators.required];
                if (isWebContent) {
                    fg.controls.productClass.setValue('');
                    fg.controls.productClass.setValidators([]);
                    fg.controls.productClass.updateValueAndValidity();
                    fg.controls.productClass.disable();
                    fg.controls.oui.setValue('');
                    fg.controls.oui.setValidators([]);
                    fg.controls.oui.updateValueAndValidity();
                    fg.controls.oui.disable();
                } else {
                    fg.controls.productClass.setValidators(validators);
                    fg.controls.productClass.updateValueAndValidity();
                    fg.controls.productClass.enable();
                    fg.controls.oui.setValidators(validators);
                    fg.controls.oui.updateValueAndValidity();
                    fg.controls.oui.enable();
                }
            });
        return fg;
    }

    onFileUpload(event: any) {
        console.log(event);
        this.formGroup.controls['file'].setValue(event.files[0]);
    }

    onFileTypesSearch(event: any) {
        const loweredCaseQuery = event.query.toLocaleLowerCase();
        this.filteredFileTypes = this.fileTypes.filter((f) =>
            f.toLocaleLowerCase().includes(loweredCaseQuery)
        );
    }
}
