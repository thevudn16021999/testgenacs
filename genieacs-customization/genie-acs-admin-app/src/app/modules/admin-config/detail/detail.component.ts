import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { AdminConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/admin-config.response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigApiService } from 'src/app/modules/@core/api-services/config/config.api-service';
import { BaseConfigRequest } from 'src/app/modules/@core/api-services/config/request-models/config.request';
import { ConfigService } from 'src/app/modules/@core/services/config.service';

@Component({
    selector: 'app-virtual-param-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    providers: [MessageService],
    styles: [
        `
            :host ::ng-deep .p-cell-editing {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }
        `,
    ],
})
export class DetailComponent implements OnInit {
    private adminConfig: AdminConfigResponse = null as any;
    formGroup: FormGroup = null as any;

    constructor(
        private readonly configService: ConfigService,
        private readonly configApiService: ConfigApiService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.fetch();
    }

    private buildForm(adminConfig: AdminConfigResponse) {
        const fg = new FormGroup({
            _id: new FormControl(adminConfig._id, [Validators.required]),
            value: new FormControl(adminConfig.value),
            type: new FormControl('admin-config', [Validators.required]),
            txThroughputMin: new FormControl(
                adminConfig.data.txThroughputMin || 0,
                [Validators.required]
            ),
            txThroughputMax: new FormControl(
                adminConfig.data.txThroughputMax || 0,
                [Validators.required]
            ),
            rxThroughputMin: new FormControl(
                adminConfig.data.rxThroughputMin || 0,
                [Validators.required]
            ),
            rxThroughputMax: new FormControl(
                adminConfig.data.rxThroughputMax || 0,
                [Validators.required]
            ),
            downloadRatio: new FormControl(
                adminConfig.data.downloadRatio || 1,
                [Validators.required]
            ),
            downloadOptionText01: new FormControl(
                adminConfig.data.downloadOptionText01,
                [Validators.required]
            ),
            downloadOptionLink01: new FormControl(
                adminConfig.data.downloadOptionLink01,
                [Validators.required]
            ),
            downloadOptionText02: new FormControl(
                adminConfig.data.downloadOptionText02
            ),
            downloadOptionLink02: new FormControl(
                adminConfig.data.downloadOptionLink02
            ),
            downloadOptionText03: new FormControl(
                adminConfig.data.downloadOptionText03
            ),
            downloadOptionLink03: new FormControl(
                adminConfig.data.downloadOptionLink03
            ),
            downloadOptionText04: new FormControl(
                adminConfig.data.downloadOptionText04
            ),
            downloadOptionLink04: new FormControl(
                adminConfig.data.downloadOptionLink04
            ),
            downloadOptionText05: new FormControl(
                adminConfig.data.downloadOptionText05
            ),
            downloadOptionLink05: new FormControl(
                adminConfig.data.downloadOptionLink05
            ),
            downloadOptionText06: new FormControl(
                adminConfig.data.downloadOptionText06
            ),
            downloadOptionLink06: new FormControl(
                adminConfig.data.downloadOptionLink06
            ),
            downloadOptionText07: new FormControl(
                adminConfig.data.downloadOptionText07
            ),
            downloadOptionLink07: new FormControl(
                adminConfig.data.downloadOptionLink07
            ),
            downloadOptionText08: new FormControl(
                adminConfig.data.downloadOptionText08
            ),
            downloadOptionLink08: new FormControl(
                adminConfig.data.downloadOptionLink08
            ),
            downloadOptionText09: new FormControl(
                adminConfig.data.downloadOptionText09
            ),
            downloadOptionLink09: new FormControl(
                adminConfig.data.downloadOptionLink09
            ),
            downloadOptionText10: new FormControl(
                adminConfig.data.downloadOptionText10
            ),
            downloadOptionLink10: new FormControl(
                adminConfig.data.downloadOptionLink10
            ),
            dashboardLink: new FormControl(adminConfig.data.dashboardLink, [
                Validators.required,
            ]),
            uploadRatio: new FormControl(adminConfig.data.uploadRatio || 1, [
                Validators.required,
            ]),
            uploadLink: new FormControl(adminConfig.data.uploadLink, [
                Validators.required,
            ]),
            uploadOptionText01: new FormControl(
                adminConfig.data.uploadOptionText01,
                [Validators.required]
            ),
            uploadOptionSize01: new FormControl(
                adminConfig.data.uploadOptionSize01,
                [Validators.required]
            ),
            uploadOptionText02: new FormControl(
                adminConfig.data.uploadOptionText02
            ),
            uploadOptionSize02: new FormControl(
                adminConfig.data.uploadOptionSize02
            ),
            uploadOptionText03: new FormControl(
                adminConfig.data.uploadOptionText03
            ),
            uploadOptionSize03: new FormControl(
                adminConfig.data.uploadOptionSize03
            ),
            uploadOptionText04: new FormControl(
                adminConfig.data.uploadOptionText04
            ),
            uploadOptionSize04: new FormControl(
                adminConfig.data.uploadOptionSize04
            ),
            uploadOptionText05: new FormControl(
                adminConfig.data.uploadOptionText05
            ),
            uploadOptionSize05: new FormControl(
                adminConfig.data.uploadOptionSize05
            ),
            uploadOptionText06: new FormControl(
                adminConfig.data.uploadOptionText06
            ),
            uploadOptionSize06: new FormControl(
                adminConfig.data.uploadOptionSize06
            ),
            uploadOptionText07: new FormControl(
                adminConfig.data.uploadOptionText07
            ),
            uploadOptionSize07: new FormControl(
                adminConfig.data.uploadOptionSize07
            ),
            uploadOptionText08: new FormControl(
                adminConfig.data.uploadOptionText08
            ),
            uploadOptionSize08: new FormControl(
                adminConfig.data.uploadOptionSize08
            ),
            uploadOptionText09: new FormControl(
                adminConfig.data.uploadOptionText09
            ),
            uploadOptionSize09: new FormControl(
                adminConfig.data.uploadOptionSize09
            ),
            uploadOptionText10: new FormControl(
                adminConfig.data.uploadOptionText10
            ),
            uploadOptionSize10: new FormControl(
                adminConfig.data.uploadOptionSize10
            ),
        });
        return fg;
    }

    onSaveBtnClicked($event: any) {
        $event.preventDefault();
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();

        if (this.formGroup.invalid) {
            return;
        }

        console.log('onSummonBtnClicked', this.formGroup.value);
        const { _id, value, type, ...options } = this.formGroup.value;
        const adminConfig = {
            _id: _id,
            type: 'admin-config',
            value: JSON.stringify({
                uploadRatio: +options.uploadRatio,
                downloadRatio: +options.downloadRatio,
                txThroughputMin: +options.txThroughputMin,
                txThroughputMax: +options.txThroughputMax,
                rxThroughputMin: +options.rxThroughputMin,
                rxThroughputMax: +options.rxThroughputMax,
                ...options,
            }),
            data: {
                uploadRatio: +options.uploadRatio,
                downloadRatio: +options.downloadRatio,
                txThroughputMin: +options.txThroughputMin,
                txThroughputMax: +options.txThroughputMax,
                rxThroughputMin: +options.rxThroughputMin,
                rxThroughputMax: +options.rxThroughputMax,
                ...options,
            },
        } as AdminConfigResponse;
        const adminConfigReq = {
            _id: adminConfig._id,
            type: adminConfig.type,
            value: JSON.stringify(adminConfig.data),
        } as BaseConfigRequest;
        this.configApiService.upsertConfig$(adminConfigReq).subscribe(() => {
            this.configService.setAdminConfig(adminConfig);
            this.messageService.add({
                severity: ToastSeverities.Success,
                summary: 'Save successfully!',
            });
        });
    }

    private fetch() {
        this.configApiService
            .getAdminConfig$()
            .subscribe((result: AdminConfigResponse) => {
                this.adminConfig = result || {
                    _id: 'admin-config',
                    value: '',
                    type: 'admin-config',
                    data: {
                        downloadLink: '',
                        uploadLink: '',
                        dashboardLink: '',
                    },
                };
                this.formGroup = this.buildForm(this.adminConfig);
            });
    }
}
