import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { ConfigService } from 'src/app/modules/@core/services/config.service';
import { Router } from '@angular/router';
import { VirtualParameterApiService } from 'src/app/modules/@core/api-services/virtual-parameter/virtual-parameter.api-service';
import { VirtualParameterResponse } from 'src/app/modules/@core/api-services/virtual-parameter/response-models/virtual-parameter.response';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';

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
    searchTerm = '';
    paginationData: PaginationResponse<VirtualParameterResponse> =
        PaginationResponseBuilder({ Items: [] });
    private readonly searchTerm$ = new BehaviorSubject<string>('');

    constructor(
        private readonly router: Router,
        private readonly virtualParameterApiService: VirtualParameterApiService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService
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
        take: number = this.configService.paginationConfig.take10
    ) {
        const filter = search
            ? `LOWER(_id) LIKE "%${search.toLocaleLowerCase()}%"`
            : '';
        this.virtualParameterApiService
            .get$(page, take, filter)
            .subscribe((data) => {
                console.log(data);
                this.paginationData = data;
            });
    }

    onSearchTermChanged($event: any) {
        console.log('onSearchTermEnter', $event);
        this.searchTerm$.next($event.target.value);
    }

    onAddNewButtonClicked($event: any) {
        this.router.navigate(['/virtual-parameters/create']);
    }

    onRowEdit(item: VirtualParameterResponse) {
        this.router.navigate([`/virtual-parameters/${item._id}`]);
    }

    onRowDelete(item: VirtualParameterResponse) {
        const ref = this.confirmationService.confirm({
            message: 'Do you want to delete virtual parameter: ' + item._id,
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.virtualParameterApiService
                    .delete$(item._id)
                    .pipe(
                        tap(() => {
                            this.fetchData();
                            this.messageService.add({
                                severity: ToastSeverities.Success,
                                summary:
                                    'Delete virtual parameter Successfully!',
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
