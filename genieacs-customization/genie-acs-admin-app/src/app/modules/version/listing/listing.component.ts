import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, filter, mergeMap, of, tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { BaseConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/config.response';
import { ConfigApiService } from 'src/app/modules/@core/api-services/config/config.api-service';
import { UpsertPopupComponent } from 'src/app/modules/version/upsert-popup/upsert-popup.component';

@Component({
    selector: 'app-version-listing',
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
export class ListingComponent {
    searchTerm = '';
    paginationData: PaginationResponse<BaseConfigResponse> =
        PaginationResponseBuilder({ Items: [] });

    constructor(
        private readonly configApiService: ConfigApiService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService,
        private readonly dialogService: DialogService
    ) {}

    fetchData(
        page: number = this.configService.paginationConfig.page,
        take: number = this.configService.paginationConfig.take10
    ) {
        this.configApiService
            .get$(page, take, 'type = "version"')
            .subscribe((data) => {
                this.paginationData = data;
            });
    }

    onSearchTermEnter() {
        console.log('onSearchTermEnter', this.searchTerm);
        // this.fetchData(this.searchTerm);
    }

    onAddNewButtonClicked($event: any) {
        const ref = this.dialogService.open(UpsertPopupComponent, {
            header: 'Add New',
            width: '70%',
            closable: true,
            data: {},
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: BaseConfigResponse) => {
                    req.type = 'version';
                    return this.configApiService.upsertConfig$(req);
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Add Successfully!',
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

    onRowEdit(item: BaseConfigResponse) {
        const ref = this.dialogService.open(UpsertPopupComponent, {
            header: 'Update: ' + item._id,
            width: '70%',
            closable: true,
            data: item,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: BaseConfigResponse) => {
                    req.type = 'version';
                    return this.configApiService.upsertConfig$(req);
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Update Successfully!',
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

    onRowDelete(item: BaseConfigResponse) {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to delete: ' + item._id,
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.configApiService
                    .delete$(item._id)
                    .pipe(
                        tap(() => {
                            this.fetchData();
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary: 'Deleted Successfully!',
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

    customSort(event: SortEvent) {
        event.data?.sort((data1, data2) => {
            let value1 = data1[event.field || ''];
            let value2 = data2[event.field || ''];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return (event.order || 0) * result;
        });
    }

    nextPage(event: any) {
        console.log('nextPage', event);
        const page = event.first / event.rows;
        this.fetchData(page, event.rows);
    }
}
