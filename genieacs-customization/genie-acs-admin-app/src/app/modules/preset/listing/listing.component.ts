import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, filter, mergeMap, of, tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { UserResponse } from 'src/app/modules/@core/api-services/user/response-models/user.response';
import { PresetApiService } from 'src/app/modules/@core/api-services/preset/preset.api-service';
import { PresetResponse } from 'src/app/modules/@core/api-services/preset/response-models/preset.response';
import { CreatePopupComponent } from 'src/app/modules/preset/create-popup/create-popup.component';
import { UpsertPresetRequest } from 'src/app/modules/@core/api-services/preset/request-models/preset.request';
import { UpdatePopupComponent } from 'src/app/modules/preset/update-popup/update-popup.component';

@Component({
    selector: 'app-preset-listing',
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
    @ViewChild('addNewBtn') addNewBtn?: ElementRef<HTMLButtonElement>;
    searchTerm = '';
    paginationData: PaginationResponse<PresetResponse> =
        PaginationResponseBuilder({ Items: [] });

    constructor(
        private readonly router: Router,
        private readonly presetApiService: PresetApiService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService,
        private readonly dialogService: DialogService
    ) {}

    fetchData(
        search: string = '',
        page: number = this.configService.paginationConfig.page,
        take: number = this.configService.paginationConfig.take10
    ) {
        this.presetApiService
            .get$(page, take, search)
            .subscribe((data) => (this.paginationData = data));
    }

    onAddNewButtonClicked($event: any) {
        const ref = this.dialogService.open(CreatePopupComponent, {
            header: 'Add Preset',
            width: '70%',
            closable: true,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: UpsertPresetRequest) => {
                    return this.presetApiService.upsert$(req);
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Add preset Successfully!',
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

    onRowEdit(item: PresetResponse) {
        const ref = this.dialogService.open(UpdatePopupComponent, {
            header: 'Update Preset',
            width: '70%',
            closable: true,
            data: item,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: UpsertPresetRequest) => {
                    return this.presetApiService.upsert$(req);
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Update preset Successfully!',
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

    onRowDelete(item: UserResponse) {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to delete this preset?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.presetApiService
                    .delete$(item._id)
                    .pipe(
                        tap(() => {
                            this.fetchData();
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary: 'Delete preset Successfully!',
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
        this.fetchData(this.searchTerm, page, event.rows);
    }
}
