import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { DeviceSummaryResponse } from 'src/app/modules/@core/api-services/device/response-models/device-summary.response';
import { DeviceApiService } from 'src/app/modules/@core/api-services/device/device.api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { BehaviorSubject, debounceTime, finalize } from 'rxjs';
import { DeviceTaskNames } from 'src/app/modules/@shared/enums/task-types.enum';
import { DeviceTaskStatuses } from 'src/app/modules/@shared/enums/entity-statuses.enum';
import { LoadingService } from 'src/app/modules/@core/services/loading.service';
import { DevicePropValueTypes } from 'src/app/modules/@shared/enums/device-prop-value-types.enum';

@Component({
    selector: 'app-device-raw-detail',
    templateUrl: './raw-detail.component.html',
    styleUrls: ['./raw-detail.component.scss'],
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
export class RawDetailComponent implements OnInit {
    private readonly searchTerm$ = new BehaviorSubject<string>('');
    device: DeviceSummaryResponse = null as any;
    deviceFieldValues: {
        key: string;
        value: any;
        editable: boolean;
        valueType: string;
    }[] = [];
    filteredDeviceFieldValues: { key: string; value: any }[] = [];
    deviceId!: string;
    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly deviceApiService: DeviceApiService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService,
        private readonly dialogService: DialogService,
        private readonly loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.deviceId = this.route.snapshot.paramMap.get('id') || '';
        this.goBackToListingIfInvalidDeviceId(this.deviceId);
        this.fetchDevice(this.deviceId);

        this.searchTerm$
            .asObservable()
            .pipe(debounceTime(300))
            .subscribe((val) => {
                const lowerCasedSearchTerm = val.toLocaleLowerCase();
                if (!lowerCasedSearchTerm) {
                    this.filteredDeviceFieldValues = [
                        ...this.deviceFieldValues,
                    ];
                    return;
                }
                this.filteredDeviceFieldValues = this.deviceFieldValues.filter(
                    (i) =>
                        i.key.toLocaleLowerCase().includes(lowerCasedSearchTerm)
                );
            });
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

                this.deviceFieldValues = [];
                for (const key in device) {
                    const editable =
                        !(device as any)[key].object &&
                        (device as any)[key].writable;
                    const value = (device as any)[key]?.value;
                    this.deviceFieldValues.push({
                        key,
                        value: value ? value[0] : '',
                        editable,
                        valueType: value ? value[1] : '',
                    });
                }
                this.searchTerm$.next(this.searchTerm$.value);
            });
    }

    onSearchTermChanged($event: any) {
        console.log('onSearchTermEnter', $event);
        this.searchTerm$.next($event.target.value);
    }

    fetchParam(paramName: string) {
        this.loadingService.load();
        this.deviceApiService
            .createSingleTask$({
                name: DeviceTaskNames.GetParameterValues,
                parameterNames: [paramName],
                device: this.deviceId,
                status: DeviceTaskStatuses.Pending,
            })
            .pipe(finalize(() => this.loadingService.unload()))
            .subscribe((result) => {
                const isCompleted = result.status === DeviceTaskStatuses.Done;
                const msg = {
                    severity: isCompleted
                        ? ToastSeverities.Success
                        : ToastSeverities.Error,
                    summary: isCompleted
                        ? 'Load param successfully!'
                        : 'Load param failed!',
                };
                this.messageService.add(msg);
                this.fetchDevice(this.deviceId);
            });
    }

    onSetParamValue($event: any, item: any) {
        const rawValue = ($event.target.value || '').trim();
        const paramType = item.valueType as DevicePropValueTypes;
        const paramValue = this.parseValueByValueType(rawValue, paramType);
        this.loadingService.load();
        this.deviceApiService
            .createTasks$(this.deviceId, [
                {
                    device: this.deviceId,
                    name: DeviceTaskNames.SetParameterValues,
                    parameterValues: [[item.key, paramValue, item.valueType]],
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
}
