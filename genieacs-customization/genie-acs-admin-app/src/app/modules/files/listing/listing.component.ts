import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { FileResponse } from 'src/app/modules/@core/api-services/file/response-models/file.response';
import { FileApiService } from 'src/app/modules/@core/api-services/file/file.api-service';
import { CreatePopupComponent } from 'src/app/modules/files/create-popup/create-popup.component';
import {
    BehaviorSubject,
    catchError,
    combineAll,
    concat,
    concatMap,
    debounceTime,
    delay,
    filter,
    finalize,
    forkJoin,
    from,
    map,
    mergeMap,
    of,
    tap,
} from 'rxjs';
import { FileRequest } from 'src/app/modules/@core/api-services/file/request-models/file.request';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { SortByFieldRequest } from 'src/app/modules/@core/api-services/share-models/sort-by-field.request';
import { sortBuilder } from 'src/app/modules/@shared/enums/sort-directions.enum';
import { DeviceApiService } from 'src/app/modules/@core/api-services/device/device.api-service';
import { Dictionary, get } from 'lodash';
import { DeviceSummaryResponse } from 'src/app/modules/@core/api-services/device/response-models/device-summary.response';
import { LoadingService } from 'src/app/modules/@core/services/loading.service';
import { index } from 'parsimmon';
import { decodeTag } from 'src/app/modules/@shared/utils/string.util';

@Component({
    selector: 'app-virtual-param-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
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
export class ListingComponent implements OnInit {
    @ViewChild('addNewBtn') addNewBtn?: ElementRef<HTMLButtonElement>;
    searchTerm = '';
    paginationData: PaginationResponse<FileResponse> =
        PaginationResponseBuilder({ Items: [] });
    private readonly searchTerm$ = new BehaviorSubject<string>('');

    constructor(
        private readonly router: Router,
        private readonly fileApiService: FileApiService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService,
        private readonly dialogService: DialogService,
        private readonly deviceApiService: DeviceApiService,
        private readonly loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.searchTerm$
            .asObservable()
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.fetchData(val);
            });
    }

    fetchData(
        search: string = '',
        page: number = this.configService.paginationConfig.page,
        take: number = this.configService.paginationConfig.take10,
        sorts: SortByFieldRequest[] = []
    ) {
        const lowercasedSearchTerm = (search || '').toLocaleLowerCase();
        const filter = search
            ? [
                  '_id',
                  'metadata.fileType',
                  'metadata.oui',
                  'metadata.productClass',
                  'metadata.version',
              ]
                  .map((i) => `LOWER(${i}) LIKE "%${lowercasedSearchTerm}%"`)
                  .join(' OR ')
            : '';

        this.fileApiService
            .get$(page, take, filter, sorts)
            .subscribe((data) => (this.paginationData = data));
    }

    onSearchTermChanged($event: any) {
        console.log('onSearchTermEnter', $event);
        this.searchTerm$.next($event.target.value);
    }

    onAddNewButtonClicked($event: any) {
        const ref = this.dialogService.open(CreatePopupComponent, {
            header: 'File',
            width: '70%',
            closable: true,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((fileReq: FileRequest) => {
                    return this.fileApiService
                        .upsert$(fileReq)
                        .pipe(map(() => fileReq));
                }),
                tap((data) => {
                    setTimeout(() => {
                        this.handerWebContentFile(data);
                    }, 0);
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Add file Successfully!',
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

    onRowEdit(item: FileResponse) {
        this.router.navigate([`/virtual-parameters/${item._id}`]);
    }

    onRowFileDownloadClick(item: FileResponse) {
        window.location.href = this.fileApiService.getFileDownloadLink(
            item._id
        );
    }

    onRowDelete(item: FileResponse) {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to delete : ' + item._id,
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.fileApiService
                    .delete$(item._id)
                    .pipe(
                        tap(() => {
                            this.fetchData();
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary: 'Delete file Successfully!',
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

    private handerWebContentFile(file: FileRequest) {
        console.log(file);
        const isWebContent = file.fileType
            .toLocaleLowerCase()
            .includes('2 Web Content'.toLocaleLowerCase());
        if (!isWebContent) {
            return;
        }
        let reader = new FileReader();
        reader.readAsText(file.file as any);
        reader.onload = () => {
            const splitter = ',';
            const csvData = reader.result;
            const csvRecordsArray = (<string>csvData)
                .split(/\r\n|\n/)
                .map((r) => r.trim())
                .filter((r) => !!r.length);

            if (!csvRecordsArray.length) {
                return this.messageService.add({
                    severity: ToastSeverities.Warning,
                    summary: 'Empty file!',
                });
            }
            csvRecordsArray.forEach((r, index) => {
                if (!r.endsWith(';')) {
                    return;
                }
                csvRecordsArray[index] = r.slice(0, r.length - 1);
            });
            const [columns, ...contentRows] = csvRecordsArray;
            const pppoeACNameColIndex = columns
                .split(splitter)
                .indexOf('PPPoEACName');

            if (pppoeACNameColIndex < 0) {
                return this.messageService.add({
                    severity: ToastSeverities.Error,
                    summary: 'Has no PPPoEACName column!',
                });
            }

            const tagsColIndex = columns.split(splitter).indexOf('Tags');
            if (tagsColIndex < 0) {
                return this.messageService.add({
                    severity: ToastSeverities.Error,
                    summary: 'Has no Tags column!',
                });
            }
            const refinedRows = contentRows
                .filter((r) => r[pppoeACNameColIndex])
                .map((r) =>
                    r
                        .replace(/"/g, '')
                        .split(splitter)
                        .map((v) => v.trim())
                );
            const missingRequiredColCount = refinedRows.filter((r, index) => {
                const value = r[pppoeACNameColIndex];
                if (!value) {
                    console.log(
                        'missingRequiredColCount index',
                        index,
                        refinedRows[index],
                        contentRows[index]
                    );
                }
                return !value;
            }).length;

            // if (missingRequiredColCount > 0) {
            //     return this.messageService.add({
            //         severity: ToastSeverities.Error,
            //         summary: `${missingRequiredColCount} row(s) have no PPPoEACName!`,
            //     });
            // }

            let successTaggingCount = 0;
            const pppoeAcNames = [
                ...new Set(
                    refinedRows.map((r) =>
                        r[pppoeACNameColIndex].replace(/"/g, '')
                    )
                ),
            ];
            this.loadingService.load();
            const deviceLookup: Dictionary<DeviceSummaryResponse> = {};
            from(pppoeAcNames)
                .pipe(
                    concatMap((n) => {
                        return this.deviceApiService.getByPPPoEACName$(n);
                    }),
                    tap((d) => {
                        if (!d) {
                            return;
                        }
                        const pppoeAcName = get(
                            (d as any)['VirtualParameters.PPPoEACName'],
                            'value[0]'
                        );
                        if (!pppoeAcName) {
                            return;
                        }
                        deviceLookup[pppoeAcName] = d;
                    }),
                    finalize(() => {
                        console.log(Object.keys(deviceLookup));

                        concat(refinedRows)
                            .pipe(
                                delay(1000),
                                mergeMap((r) => {
                                    const pppoeAcName = r[
                                        pppoeACNameColIndex
                                    ].replace(/"/g, '');
                                    const tagValues = (
                                        r[tagsColIndex] || ''
                                    ).replace(/"/g, '');
                                    if (!pppoeAcName) {
                                        // this.messageService.add({
                                        //     severity: ToastSeverities.Error,
                                        //     summary: 'Has no PPPoEACName!',
                                        // });
                                        return of(false);
                                    }

                                    const item = deviceLookup[pppoeAcName];
                                    if (!item) {
                                        return of(undefined);
                                    }
                                    const deviceId = get(
                                        item['DeviceID.ID'],
                                        'value[0]',
                                        ''
                                    );
                                    if (!deviceId) {
                                        return of(undefined);
                                    }
                                    const originTagValues = get(
                                        item['TagValues'],
                                        'value[0]',
                                        ''
                                    );
                                    if (!originTagValues) {
                                        return of([deviceId, tagValues]);
                                    }
                                    return forkJoin([
                                        ...originTagValues
                                            .split(splitter)
                                            .map((tagVal) =>
                                                this.deviceApiService.deleteTag$(
                                                    {
                                                        device: deviceId,
                                                        tagVal: decodeTag(
                                                            tagVal
                                                        ),
                                                    }
                                                )
                                            ),
                                    ]).pipe(map(() => [deviceId, tagValues]));
                                }),
                                mergeMap((result) => {
                                    if (!result) {
                                        return of(undefined);
                                    }
                                    const [deviceId, tagValues] =
                                        result as string[];
                                    if (!tagValues) {
                                        return of(undefined);
                                    }
                                    return forkJoin([
                                        ...(tagValues as string)
                                            .split(';')
                                            .map((tagVal) =>
                                                this.deviceApiService.upsertTag$(
                                                    {
                                                        device: deviceId,
                                                        tagVal: tagVal,
                                                    }
                                                )
                                            ),
                                    ]).pipe(map(() => true));
                                }),
                                tap((result) => {
                                    if (!result) {
                                        return;
                                    }
                                    successTaggingCount++;
                                }),
                                finalize(() => {
                                    return this.messageService.add({
                                        severity: ToastSeverities.Info,
                                        summary: `Processed ${successTaggingCount}/${contentRows.length}!`,
                                    });
                                }),
                                finalize(() => this.loadingService.unload())
                            )
                            .subscribe();
                    })
                )
                .subscribe();
            // concat(pppoeAcNames)
            //     .pipe(
            //         mergeMap((n) => {
            //             return this.deviceApiService.getByPPPoEACName$(n);
            //         }),
            //         tap((d) => {
            //             const pppoeAcName = get(
            //                 (d as any)['VirtualParameters.PPPoEACName'],
            //                 'value[0]'
            //             );
            //             if (!pppoeAcName) {
            //                 return;
            //             }
            //             deviceLookup[pppoeAcName] = d;
            //         }),
            //         finalize(() => {
            //             console.log(Object.keys(deviceLookup));
            //         })
            //     )
            //     .subscribe();

            // this.deviceApiService
            //     .getByPPPoEACNames$(pppoeAcNames)
            //     .subscribe((devices) => {
            //         const deviceLookup: Dictionary<DeviceSummaryResponse> = {};
            //         devices.forEach((d) => {
            //             const pppoeAcName = get(
            //                 (d as any)['VirtualParameters.PPPoEACName'],
            //                 'value[0]'
            //             );
            //             if (!pppoeAcName) {
            //                 return;
            //             }
            //             deviceLookup[pppoeAcName] = d;
            //         });
            //         concat(refinedRows)
            //             .pipe(
            //                 delay(1000),
            //                 mergeMap((r) => {
            //                     const pppoeAcName = r[pppoeACNameColIndex];
            //                     const tagValues = r[tagsColIndex] || '';
            //                     if (!pppoeAcName) {
            //                         this.messageService.add({
            //                             severity: ToastSeverities.Error,
            //                             summary: 'Has no PPPoEACName!',
            //                         });
            //                         return of(false);
            //                     }

            //                     const item = deviceLookup[pppoeAcName];
            //                     if (!item) {
            //                         return of(undefined);
            //                     }
            //                     const deviceId = get(
            //                         item['DeviceID.ID'],
            //                         'value[0]',
            //                         ''
            //                     );
            //                     if (!deviceId) {
            //                         return of(undefined);
            //                     }
            //                     const originTagValues = get(
            //                         item['TagValues'],
            //                         'value[0]',
            //                         ''
            //                     );
            //                     if (!originTagValues) {
            //                         return of([deviceId, tagValues]);
            //                     }
            //                     return forkJoin([
            //                         ...originTagValues
            //                             .split(splitter)
            //                             .map((tagVal) =>
            //                                 this.deviceApiService.deleteTag$({
            //                                     device: deviceId,
            //                                     tagVal: tagVal,
            //                                 })
            //                             ),
            //                     ]).pipe(map(() => [deviceId, tagValues]));
            //                 }),
            //                 mergeMap((result) => {
            //                     if (!result) {
            //                         return of(undefined);
            //                     }
            //                     const [deviceId, tagValues] =
            //                         result as string[];
            //                     if (!tagValues) {
            //                         return of(undefined);
            //                     }
            //                     return forkJoin([
            //                         ...(tagValues as string)
            //                             .split(';')
            //                             .map((tagVal) =>
            //                                 this.deviceApiService.upsertTag$({
            //                                     device: deviceId,
            //                                     tagVal: tagVal,
            //                                 })
            //                             ),
            //                     ]).pipe(map(() => true));
            //                 }),
            //                 tap((result) => {
            //                     if (!result) {
            //                         return;
            //                     }
            //                     successTaggingCount++;
            //                 }),
            //                 finalize(() => {
            //                     return this.messageService.add({
            //                         severity: ToastSeverities.Info,
            //                         summary: `Processed ${successTaggingCount}/${contentRows.length}!`,
            //                     });
            //                 }),
            //                 finalize(() => this.loadingService.unload())
            //             )
            //             .subscribe();
            //     });
        };

        reader.onerror = function () {
            console.log('error is occured while reading file!');
        };
    }

    nextPage(event: any) {
        console.log('nextPage', event);
        const sorts = sortBuilder(event.multiSortMeta);
        const page = event.first / event.rows;
        this.fetchData(this.searchTerm$.value || '', page, event.rows, sorts);
    }
}
