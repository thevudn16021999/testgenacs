import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, filter, mergeMap, of, tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { PermissionApiService } from 'src/app/modules/@core/api-services/permission/permission.api-service';
import { PermissionResponse } from 'src/app/modules/@core/api-services/permission/response-models/permission.response';
import { PermissionRequest } from 'src/app/modules/@core/api-services/permission/request-models/permission.request';
import { CreatePopupComponent } from 'src/app/modules/permission/create-popup/create-popup.component';
import { ResourceAccessLevels } from 'src/app/modules/@shared/enums/resource-permissions.enum';
import { sortBuilder } from 'src/app/modules/@shared/enums/sort-directions.enum';
import { SortByFieldRequest } from 'src/app/modules/@core/api-services/share-models/sort-by-field.request';

@Component({
    selector: 'app-permission-listing',
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
    paginationData: PaginationResponse<PermissionResponse> =
        PaginationResponseBuilder({ Items: [] });
    public readonly AccessNameLookup = {
        [ResourceAccessLevels.Count.toString()]: 'Count',
        [ResourceAccessLevels.Read.toString()]: 'Read',
        [ResourceAccessLevels.Write.toString()]: 'Write',
    };
    constructor(
        private readonly router: Router,
        private readonly permissionApiService: PermissionApiService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService,
        private readonly dialogService: DialogService
    ) {}

    fetchData(
        search: string = '',
        page: number = this.configService.paginationConfig.page,
        take: number = this.configService.paginationConfig.take10,
        sorts: SortByFieldRequest[] = []
    ) {
        this.permissionApiService
            .get$(page, take, search, sorts)
            .subscribe((data) => (this.paginationData = data));
    }

    onAddNewButtonClicked($event: any) {
        const ref = this.dialogService.open(CreatePopupComponent, {
            header: 'Add Permission',
            width: '70%',
            closable: true,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: PermissionRequest) => {
                    return this.permissionApiService.upsert$(req);
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Add permission Successfully!',
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

    // onRowEdit(item: FileResponse) {
    //     this.router.navigate([`/virtual-parameters/${item._id}`]);
    // }

    onRowDelete(item: PermissionResponse) {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to delete this permission',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.permissionApiService
                    .delete$(item)
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
        const sorts = sortBuilder(event.multiSortMeta);
        const page = event.first / event.rows;
        this.fetchData(this.searchTerm, page, event.rows, sorts);
    }
}
