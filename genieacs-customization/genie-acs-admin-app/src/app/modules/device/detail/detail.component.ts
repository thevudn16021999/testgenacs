import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, filter, finalize, map, mergeMap, of, tap } from 'rxjs';
import { DeviceApiService } from 'src/app/modules/@core/api-services/device/device.api-service';
import { GettingDeviceTaskRequest } from 'src/app/modules/@core/api-services/device/request-models/getting-device-task.request';
import {
    DeviceIdProductClass,
    DeviceSummaryResponse,
} from 'src/app/modules/@core/api-services/device/response-models/device-summary.response';
import { DeviceTaskStatuses } from 'src/app/modules/@shared/enums/entity-statuses.enum';
import { DeviceTaskNames } from 'src/app/modules/@shared/enums/task-types.enum';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { DiagnosticsStates } from 'src/app/modules/@shared/enums/diagnostics-states.enum';
import { DevicePropValueTypes } from 'src/app/modules/@shared/enums/device-prop-value-types.enum';
import {
    formatDDMMYYYYHHmmSS,
    formatDateTimeAsAgo,
    getStartAndEndOfDate,
} from 'src/app/modules/@shared/utils/date.util';
import { LoadingService } from 'src/app/modules/@core/services/loading.service';
import { DialogService } from 'primeng/dynamicdialog';
import { FilePushingPopupComponent } from 'src/app/modules/device/file-pushing-popup/file-pushing-popup.component';
import { FileResponse } from 'src/app/modules/@core/api-services/file/response-models/file.response';
import { FilePushingRequest } from 'src/app/modules/@core/api-services/device/request-models/file-pushing.request';
import { TaskRequest } from 'src/app/modules/@core/api-services/device/request-models/task.request';
import { AdminConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/admin-config.response';
import { bytesToSize } from 'src/app/modules/@shared/utils/binary.util';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { DevicePropResponse } from 'src/app/modules/@core/api-services/device/response-models/device-task.response';
import { get } from 'lodash';
import { decodeTag } from 'src/app/modules/@shared/utils/string.util';
import { DeviceLogApiService } from 'src/app/modules/@core/api-services/device-log/device-log.api-service';
import { DeviceLog } from 'src/app/modules/@core/api-services/device-log/response-models/device-log.response';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
    selector: 'app-device-detail',
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
    device: DeviceSummaryResponse | any = null as any;
    formGroup!: FormGroup;
    downloadOptions: { text: string; value: string }[] = [];
    selectedDownloadOption: { text: string; value: string } = null as any;
    uploadLink: string = '';
    uploadOptions: { text: string; value: number }[] = [];
    selectedUploadOption: { text: string; value: number } = null as any;
    tags: string[] = [];
    tagInput = '';
    downloadRatio: number = 1;
    uploadRatio: number = 1;
    private deviceId: string = '';
    hasNoTestSpeed = false;
    adminConfig!: AdminConfigResponse;
    defaultTxRxVal = -1111.1111;
    ThroughtputStatuses = {
        Undefined: -1,
        NoValue: 0,
        Bad: 1,
        Normal: 2,
        Good: 3,
    };
    private readonly minuteInMS = 1000 * 60;
    private readonly bufferInMS = 10 * this.minuteInMS;
    private readonly thirtyMinuteInMS = 30 * this.minuteInMS - this.bufferInMS;
    documentStyle: any;
    options: any;
    throughputChartData: any;
    byteChartData: any;
    clientConnectionCountChartData: any;
    chartDateRange: Date[] = [];
    deviceLogs: {
        originalLogs: DeviceLog[];
        byteSentAvgGapValues: number[];
        byteReceivedAvgGapValues: number[];
    } = {
        originalLogs: [],
        byteSentAvgGapValues: [],
        byteReceivedAvgGapValues: [],
    };

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly deviceApiService: DeviceApiService,
        private readonly messageService: MessageService,
        public readonly loadingService: LoadingService,
        private readonly dialogService: DialogService,
        private readonly confirmationService: ConfirmationService,
        private readonly cdf: ChangeDetectorRef,
        private readonly configService: ConfigService,
        private readonly deviceLogApiService: DeviceLogApiService
    ) {}

    ngOnInit(): void {
        this.initChartStyle();
        this.chartDateRange = getStartAndEndOfDate(new Date());
        this.chartDateRangeChanged();
        this.deviceId = this.activatedRoute.snapshot.paramMap.get('id') || '';
        this.goBackToListingIfInvalidDeviceId(this.deviceId);
        this.fetchDevice(this.deviceId);
        this.fetchAdminConfig();
    }

    private summonDevice$() {
        return this.deviceApiService.createSingleTask$({
            name: DeviceTaskNames.GetParameterValues,
            parameterNames: ['VirtualParameters'],
            device: this.deviceId,
            status: DeviceTaskStatuses.Pending,
        });
    }

    onSummonBtnClicked($event: any) {
        console.log('onSummonBtnClicked');
        this.loadingService.load();
        this.summonDevice$()
            .pipe(finalize(() => this.loadingService.unload()))
            .subscribe((result) => {
                const isCompleted = result.status === DeviceTaskStatuses.Done;
                const msg = {
                    severity: isCompleted
                        ? ToastSeverities.Success
                        : ToastSeverities.Error,
                    summary: isCompleted
                        ? 'Summoned successfully!'
                        : 'Can not connect to device!',
                };
                this.messageService.add(msg);
                this.fetchDevice(this.deviceId);
            });
    }
    onTestDownloadBtnClicked($event: any) {
        if (this.hasNoTestSpeed) {
            return;
        }
        this.loadingService.load();
        this.summonDevice$()
            .pipe(finalize(() => this.loadingService.unload()))
            .subscribe((result) => {
                const isCompleted = result.status === DeviceTaskStatuses.Done;
                if (!isCompleted) {
                    const msg = {
                        severity: ToastSeverities.Error,
                        summary: 'Can not connect to device!',
                    };
                    this.messageService.add(msg);
                    return;
                }
                this.loadingService.load();
                this.deviceApiService
                    .createTasks$(this.deviceId, [
                        {
                            device: this.deviceId,
                            name: DeviceTaskNames.SetParameterValues,
                            parameterValues: [
                                [
                                    'VirtualParameters.DownloadURL',
                                    this.selectedDownloadOption.value,
                                    DevicePropValueTypes.String,
                                ],
                            ],
                            status: DeviceTaskStatuses.Pending,
                        },
                    ])
                    .pipe(
                        mergeMap(() => {
                            return this.deviceApiService.createTasks$(
                                this.deviceId,
                                [
                                    {
                                        device: this.deviceId,
                                        name: DeviceTaskNames.SetParameterValues,
                                        parameterValues: [
                                            [
                                                'VirtualParameters.DownloadDiagnosticsState',
                                                DiagnosticsStates.Requested,
                                                DevicePropValueTypes.String,
                                            ],
                                        ],
                                        status: DeviceTaskStatuses.Pending,
                                    },
                                ]
                            );
                        }),
                        tap(() => {
                            this.poolDiagnosticsState(true, 1000);
                        }),
                        finalize(() => this.loadingService.unload())
                    )
                    .subscribe();
            });
    }

    onTestUploadBtnClicked($event: any) {
        console.log('onTestUploadBtnClicked');
        if (this.hasNoTestSpeed) {
            return;
        }
        this.loadingService.load();
        this.deviceApiService
            .createTasks$(this.deviceId, [
                {
                    device: this.deviceId,
                    name: DeviceTaskNames.SetParameterValues,
                    parameterValues: [
                        [
                            'VirtualParameters.UploadTestFileLength',
                            this.selectedUploadOption.value,
                            DevicePropValueTypes.Number,
                        ],
                    ],
                    status: DeviceTaskStatuses.Pending,
                },
                {
                    device: this.deviceId,
                    name: DeviceTaskNames.SetParameterValues,
                    parameterValues: [
                        [
                            'VirtualParameters.UploadURL',
                            this.uploadLink,
                            DevicePropValueTypes.String,
                        ],
                    ],
                    status: DeviceTaskStatuses.Pending,
                },
            ])
            .pipe(
                mergeMap(() => {
                    return this.deviceApiService.createTasks$(this.deviceId, [
                        {
                            device: this.deviceId,
                            name: DeviceTaskNames.SetParameterValues,
                            parameterValues: [
                                [
                                    'VirtualParameters.UploadDiagnosticsState',
                                    DiagnosticsStates.Requested,
                                    DevicePropValueTypes.String,
                                ],
                            ],
                            status: DeviceTaskStatuses.Pending,
                        },
                    ]);
                }),
                map((taskResults) => {
                    this.poolDiagnosticsState(false, 1000);
                })
            )
            .subscribe(console.log);
    }

    private poolDiagnosticsState(
        isDownloaded: boolean,
        internal: number = 2000
    ) {
        const requestingFieldNames = isDownloaded
            ? [
                  'VirtualParameters.DownloadDiagnosticsState',
                  'VirtualParameters.DownloadBOMTime',
                  'VirtualParameters.DownloadEOMTime',
                  'VirtualParameters.DownloadTotalBytesReceived',
              ]
            : [
                  'VirtualParameters.UploadDiagnosticsState',
                  'VirtualParameters.UploadBOMTime',
                  'VirtualParameters.UploadEOMTime',
                  'VirtualParameters.UploadTotalBytesSent',
              ];
        this.deviceApiService
            .createTasks$(this.deviceId, [
                {
                    name: DeviceTaskNames.GetParameterValues,
                    device: this.deviceId,
                    parameterNames: requestingFieldNames,
                    status: DeviceTaskStatuses.Pending,
                },
            ] as GettingDeviceTaskRequest[])
            .pipe(
                mergeMap((taskResponses) => {
                    return this.deviceApiService.getById$(this.deviceId);
                })
            )
            .subscribe((device) => {
                const diagnosticsState = (device as any)[
                    isDownloaded
                        ? 'VirtualParameters.DownloadDiagnosticsState'
                        : 'VirtualParameters.UploadDiagnosticsState'
                ] as DeviceIdProductClass;

                const isCompleted =
                    diagnosticsState.value[0] === DiagnosticsStates.Completed;
                if (!isCompleted) {
                    setTimeout(() => {
                        this.poolDiagnosticsState(isDownloaded, internal);
                    }, internal);
                    return;
                }
                const msg = isDownloaded
                    ? 'Download Completed!'
                    : 'Upload Completed!';
                this.messageService.add({
                    severity: ToastSeverities.Success,
                    summary: msg,
                });
                this.device = device;
                this.loadingService.unload();
            });
    }

    public get UploadSpeed() {
        const startTime =
            +this.getValue(
                this.device['VirtualParameters.UploadBOMTime'],
                'value[0]'
            ) || 0;
        if (startTime < 1) {
            return 'n/a';
        }
        const endTime =
            +this.getValue(
                this.device['VirtualParameters.UploadEOMTime'],
                'value[0]'
            ) || 0;
        if (endTime < 1) {
            return 'n/a';
        }
        const totalBytesSent =
            +this.getValue(
                this.device['VirtualParameters.UploadTotalBytesSent'],
                'value[0]'
            ) || 0;
        if (totalBytesSent < 1) {
            return 'n/a';
        }
        const seconds = (endTime - startTime) / 1000;
        const val = bytesToSize((totalBytesSent * this.uploadRatio) / seconds);
        return `${val}/s (${formatDateTimeAsAgo(endTime)})`;
    }

    public get DownloadSpeed() {
        const startTime =
            +this.getValue(
                this.device['VirtualParameters.DownloadBOMTime'],
                'value[0]'
            ) || 0;
        if (startTime < 1) {
            return 'n/a';
        }
        const endTime =
            +this.getValue(
                this.device['VirtualParameters.DownloadEOMTime'],
                'value[0]'
            ) || 0;
        if (endTime < 1) {
            return 'n/a';
        }
        const totalBytesRecieved =
            +this.getValue(
                this.device['VirtualParameters.DownloadTotalBytesReceived'],
                'value[0]'
            ) || 0;
        if (totalBytesRecieved < 1) {
            return 'n/a';
        }
        const seconds = (endTime - startTime) / 1000;
        const val = bytesToSize(
            (totalBytesRecieved * this.downloadRatio) / seconds
        );
        return `${val}/s (${formatDateTimeAsAgo(endTime)})`;
    }

    public get calculateTxThroughputStatus() {
        if (!this.adminConfig) {
            return this.ThroughtputStatuses.Undefined;
        }
        const rawTxThroughput = this.getValue(
            this.device['VirtualParameters.TxThroughput'],
            'value[0]'
        );
        if (isNaN(rawTxThroughput)) {
            return this.ThroughtputStatuses.Undefined;
        }
        const txThroughput = +rawTxThroughput;
        if (txThroughput === 0) {
            return this.ThroughtputStatuses.NoValue;
        }
        if (txThroughput < this.adminConfig.data.txThroughputMin) {
            return this.ThroughtputStatuses.Bad;
        }
        if (txThroughput > this.adminConfig.data.txThroughputMax) {
            return this.ThroughtputStatuses.Good;
        }
        return this.ThroughtputStatuses.Normal;
    }

    public get calculateRxThroughputStatus() {
        if (!this.adminConfig) {
            return this.ThroughtputStatuses.Undefined;
        }
        const rawRxThroughput = this.getValue(
            this.device['VirtualParameters.RxThroughput'],
            'value[0]'
        );
        if (isNaN(rawRxThroughput)) {
            return this.ThroughtputStatuses.Undefined;
        }
        const rxThroughput = +rawRxThroughput;
        if (rxThroughput === 0) {
            return this.ThroughtputStatuses.NoValue;
        }
        if (rxThroughput < this.adminConfig.data.rxThroughputMin) {
            return this.ThroughtputStatuses.Bad;
        }
        if (rxThroughput > this.adminConfig.data.rxThroughputMax) {
            return this.ThroughtputStatuses.Good;
        }
        return this.ThroughtputStatuses.Normal;
    }

    private fetchDevice(deviceId: string) {
        this.deviceApiService
            .getById$(deviceId)
            .subscribe((device: DeviceSummaryResponse) => {
                if (!device) {
                    this.goBackToListingIfInvalidDeviceId('');
                    return;
                }
                this.device = device;
                this.extractTags(device);
                this.hasNoTestSpeed =
                    this.configService.NoTestSpeedProductClasses.includes(
                        this.getValue(
                            this.device['DeviceID.ProductClass'],
                            'value[0]'
                        ) || ''
                    );
            });
    }

    private fetchAdminConfig() {
        this.configService.adminConfig$.subscribe(
            (config: AdminConfigResponse) => {
                this.downloadRatio = config.data.downloadRatio;
                this.uploadRatio = config.data.uploadRatio;
                this.uploadLink = config.data.uploadLink;
                const downloadOptions: any[] = [];
                const uploadOptions: any[] = [];
                this.adminConfig = config;
                Array(10)
                    .fill(undefined)
                    .forEach((i, index) => {
                        const strIndex =
                            (index < 9 ? '0' : '') + (index + 1).toString();

                        downloadOptions.push({
                            text: (config.data as any)[
                                'downloadOptionText' + strIndex
                            ],
                            value: (config.data as any)[
                                'downloadOptionLink' + strIndex
                            ],
                        });

                        uploadOptions.push({
                            text: (config.data as any)[
                                'uploadOptionText' + strIndex
                            ],
                            value: (config.data as any)[
                                'uploadOptionSize' + strIndex
                            ],
                        });
                    });
                this.downloadOptions = downloadOptions.filter(
                    (o) => !!o.text && !!o.value
                );
                this.uploadOptions = uploadOptions.filter(
                    (o) => !!o.text && !!o.value
                );
                this.cdf.detectChanges();
            }
        );
    }

    private goBackToListingIfInvalidDeviceId(deviceId: string) {
        if (deviceId) {
            return;
        }
        this.messageService.add({
            severity: ToastSeverities.Error,
            summary: 'Device Not Found!',
        });
        this.router.navigate(['/devices']);
        return;
    }

    onSaveBtnClicked(e: any) {
        e.preventDefault();
    }

    onTagInputEntered($event: any) {
        const tagVal = ($event.target.value || '').trim();
        if (tagVal.length < 1) {
            return;
        }
        $event.target.value = '';
        this.deviceApiService
            .upsertTag$({ device: this.deviceId, tagVal: tagVal })
            .pipe(
                map(() => {
                    this.tags.push(tagVal);
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: `Tag: ${tagVal} added successfully!`,
                    });
                }),
                catchError((e) => {
                    this.messageService.add({
                        severity: ToastSeverities.Error,
                        summary: `Tag: ${tagVal} added failed!`,
                    });
                    return of();
                })
            )
            .subscribe();
    }

    onTagDeleted(tagIndex: number) {
        console.log(tagIndex);
        const tagVal = this.tags[tagIndex];
        this.deviceApiService
            .deleteTag$({ device: this.deviceId, tagVal: decodeTag(tagVal) })
            .pipe(
                map(() => {
                    this.tags.splice(tagIndex, 1);
                    this.tags = [...this.tags];
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: `Tag: ${tagVal} deleted successfully!`,
                    });
                }),
                catchError((e) => {
                    this.messageService.add({
                        severity: ToastSeverities.Error,
                        summary: `Tag: ${tagVal} added failed!`,
                    });
                    return of();
                })
            )
            .subscribe();
    }

    private extractTags(device: DeviceSummaryResponse) {
        const tagValues = device.TagValues?.value[0] || '';
        this.tags = tagValues.length
            ? tagValues.split(',').map((t) => decodeTag(t))
            : [];
    }

    onRebootBtnClicked() {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to reboot this device?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                const rebootTaskReq = {
                    device: this.deviceId,
                    name: DeviceTaskNames.Reboot,
                    status: DeviceTaskStatuses.Pending,
                } as TaskRequest;
                this.deviceApiService
                    .createSingleTask$(rebootTaskReq)
                    .pipe(
                        tap(() => {
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary: 'Rebooted device Successfully!',
                            });
                        }),
                        catchError((e) => {
                            this.messageService.add({
                                severity: ToastSeverities.Error,
                                summary: 'Error!',
                            });
                            return of(undefined);
                        })
                    )
                    .subscribe();
            },
        });
    }

    onDeleteBtnClicked() {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to delete this device?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                const rebootTaskReq = {
                    device: this.deviceId,
                    name: DeviceTaskNames.Reboot,
                    status: DeviceTaskStatuses.Pending,
                } as TaskRequest;
                this.deviceApiService
                    .deleteDevice$(this.deviceId)
                    .pipe(
                        tap(() => {
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary: 'Deleted device Successfully!',
                            });
                            this.deviceId = '';
                            this.goBackToListingIfInvalidDeviceId(
                                this.deviceId
                            );
                        }),
                        catchError((e) => {
                            this.messageService.add({
                                severity: ToastSeverities.Error,
                                summary: 'Error!',
                            });
                            return of(undefined);
                        })
                    )
                    .subscribe();
            },
        });
    }

    onResetBtnClicked() {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to reset this device?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                const resetTaskReq = {
                    device: this.deviceId,
                    name: DeviceTaskNames.FactoryReset,
                    status: DeviceTaskStatuses.Pending,
                } as TaskRequest;
                this.deviceApiService
                    .createSingleTask$(resetTaskReq)
                    .pipe(
                        tap(() => {
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary: 'Reset device Successfully!',
                            });
                        }),
                        catchError((e) => {
                            this.messageService.add({
                                severity: ToastSeverities.Error,
                                summary: 'Error!',
                            });
                            return of(undefined);
                        })
                    )
                    .subscribe();
            },
        });
    }
    onPushFileBtnClicked() {
        const ref = this.dialogService.open(FilePushingPopupComponent, {
            header: 'Pushing File',
            width: '70%',
            closable: true,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((fileRes: FileResponse) => {
                    const fileReq = {
                        device: this.deviceId,
                        fileName: fileRes._id,
                        fileType: fileRes['metadata.fileType'],
                        name: DeviceTaskNames.Download,
                        status: DeviceTaskStatuses.Pending,
                    } as FilePushingRequest;
                    return this.deviceApiService.createFileTask$(fileReq);
                }),
                tap(() => {
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Pushed file Successfully!',
                    });
                }),
                catchError((e) => {
                    this.messageService.add({
                        severity: ToastSeverities.Error,
                        summary: 'Error!',
                    });
                    return of(undefined);
                })
            )
            .subscribe();
    }

    onSetParamValue($event: any, paramKey: string) {
        const rawValue = ($event.target.value || '').trim();
        const deviceProp = this.device[paramKey] as DevicePropResponse;
        const paramType =
            !!deviceProp && !!deviceProp.value && deviceProp.value.length === 2
                ? (deviceProp.value[1] as DevicePropValueTypes)
                : '';
        console.log('onSetParamValue', rawValue, paramType);
        if (!paramType) {
            return;
        }
        const paramValue = this.parseValueByValueType(rawValue, paramType);
        this.loadingService.load();
        this.deviceApiService
            .createTasks$(this.deviceId, [
                {
                    device: this.deviceId,
                    name: DeviceTaskNames.SetParameterValues,
                    parameterValues: [[paramKey, paramValue, paramType]],
                    status: DeviceTaskStatuses.Pending,
                },
            ])
            .pipe(finalize(() => this.loadingService.unload()))
            .subscribe((results) => {
                const isCompleted =
                    results && results[0]?.status === DeviceTaskStatuses.Done;
                const msg = {
                    severity: isCompleted
                        ? ToastSeverities.Success
                        : ToastSeverities.Error,
                    summary: isCompleted ? 'Set Param successfully!' : 'Error!',
                };
                this.messageService.add(msg);
                this.fetchDevice(this.deviceId);
            });
    }
    getValue = get;

    private parseValueByValueType(
        value: string,
        valueType: DevicePropValueTypes
    ) {
        if (valueType === DevicePropValueTypes.Boolean) {
            return !!value;
        }
        if (valueType === DevicePropValueTypes.Number) {
            return parseInt(value, 10);
        }
        if (valueType === DevicePropValueTypes.String) {
            return value;
        }
        const dateVal = new Date(value);
        return dateVal.getTime();
    }

    private initChartStyle() {
        this.documentStyle = getComputedStyle(document.documentElement);
        const textColor = this.documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = this.documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            this.documentStyle.getPropertyValue('--surface-border');

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    onExportBtnClicked(type: string) {
        if (type === 'throughput') {
            this.exportThroughput();
        } else if (type === 'traffic') {
            this.exportTraffic();
        } else {
            this.exportConnection();
        }
    }

    chartDateRangeChanged() {
        const [from, to] = this.chartDateRange;
        if (!from || !to) {
            return;
        }
        console.log(this.chartDateRange);
        this.deviceLogApiService.get$(from, to, 0, 10000).subscribe((logs) => {
            this.deviceLogs.originalLogs = logs.Items;
            this.throughputChartData = {
                labels: logs.Items.map((l, index) =>
                    formatDDMMYYYYHHmmSS(l.Created)
                ),
                datasets: [
                    {
                        label: 'Tx(dBm)',
                        data: logs.Items.map((i) => i.TxThroughput),
                        fill: false,
                        borderColor:
                            this.documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4,
                    },
                    {
                        label: 'Rx(dBm)',
                        data: logs.Items.map((i) => i.RxThroughput),
                        fill: false,
                        borderColor:
                            this.documentStyle.getPropertyValue('--pink-500'),
                        tension: 0.4,
                    },
                ],
            };

            this.deviceLogs = {
                ...this.deviceLogs,
                byteSentAvgGapValues: this.buildByteSentData(logs.Items),
                byteReceivedAvgGapValues: this.buildByteReceivedData(
                    logs.Items
                ),
            };

            this.byteChartData = {
                labels: logs.Items.slice(1).map((l, index) =>
                    formatDDMMYYYYHHmmSS(l.Created)
                ),
                datasets: [
                    {
                        label: 'Traffic in (MB)',
                        data: this.deviceLogs.byteReceivedAvgGapValues,
                        fill: false,
                        borderColor:
                            this.documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4,
                    },
                    {
                        label: 'Traffic out (MB)',
                        data: this.deviceLogs.byteSentAvgGapValues,
                        fill: false,
                        borderColor:
                            this.documentStyle.getPropertyValue('--pink-500'),
                        tension: 0.4,
                    },
                ],
            };
            this.clientConnectionCountChartData = {
                labels: logs.Items.map((l, index) =>
                    formatDDMMYYYYHHmmSS(l.Created)
                ),
                datasets: [
                    {
                        label: 'Client Connection',
                        data: logs.Items.map((i) => i.ClientConnectionNumber),
                        fill: false,
                        borderColor:
                            this.documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4,
                    },
                ],
            };
        });
    }

    private buildByteSentData(logs: DeviceLog[]) {
        if (!logs) {
            return [];
        }
        if (logs.length < 2) {
            return logs.map((l) => l.BytesSent);
        }
        const trafficData: number[] = [];
        const timeGapInMS = Math.ceil(
            (logs[1].Created - logs[0].Created) / this.minuteInMS
        );

        logs.forEach((l, i) => {
            if (!i) return;
            const gapVal = logs[i].BytesSent - logs[i - 1].BytesSent;
            trafficData.push(gapVal / timeGapInMS);
        });
        return trafficData;
    }

    private buildByteReceivedData(logs: DeviceLog[]) {
        if (!logs) {
            return [];
        }
        if (logs.length < 2) {
            return logs.map((l) => l.BytesSent);
        }
        const trafficData: number[] = [];
        const timeGapInMS = Math.ceil(
            (logs[1].Created - logs[0].Created) / this.minuteInMS
        );

        logs.forEach((l, i) => {
            if (!i) return;
            const gapVal = logs[i].BytesReceived - logs[i - 1].BytesReceived;
            trafficData.push(gapVal / timeGapInMS);
        });
        return trafficData;
    }

    private exportThroughput() {
        const options = {
            headers: ['time', 'tx', 'rx'],
        };
        const throughputData = this.deviceLogs.originalLogs.map((l) => ({
            Created: l.Created,
            Tx: l.TxThroughput,
            Rx: l.RxThroughput,
        }));
        setTimeout(() => {
            new AngularCsv(throughputData, 'throughput-' + Date.now(), options);
        });
        this.messageService.add({
            severity: ToastSeverities.Success,
            summary: `Export successfully!`,
        });
    }
    private exportTraffic() {
        const options = {
            headers: [
                'time',
                'avg-byte-sent-change',
                'avg-byte-received-change',
            ],
        };
        const trafficData: any[] = [];
        this.deviceLogs.originalLogs.forEach((l, i) => {
            if (!i) return;
            trafficData.push({
                Created: l.Created,
                AvgByteSentChange: this.deviceLogs.byteSentAvgGapValues[i - 1],
                AvgByteReceivedChange:
                    this.deviceLogs.byteReceivedAvgGapValues[i - 1],
            });
        });
        setTimeout(() => {
            new AngularCsv(trafficData, 'traffic-' + Date.now(), options);
        });
        this.messageService.add({
            severity: ToastSeverities.Success,
            summary: `Export successfully!`,
        });
    }
    private exportConnection() {
        const options = {
            headers: ['time', 'connection-count'],
        };
        const connectionData = this.deviceLogs.originalLogs.map((l) => ({
            Created: l.Created,
            ConnectionCount: l.ClientConnectionNumber,
        }));
        setTimeout(() => {
            new AngularCsv(
                connectionData,
                'client-connection-' + Date.now(),
                options
            );
        });
        this.messageService.add({
            severity: ToastSeverities.Success,
            summary: `Export successfully!`,
        });
    }
}
