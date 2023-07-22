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
import { UserResponse } from 'src/app/modules/@core/api-services/user/response-models/user.response';
import { UserApiService } from 'src/app/modules/@core/api-services/user/user.api-service';
import {
    UserPasswordRequest,
    UserRequest,
} from 'src/app/modules/@core/api-services/user/request-models/user.request';
import { UpsertUserDto } from 'src/app/modules/@core/api-services/user/user-create.dto';
import { CreatePopupComponent } from 'src/app/modules/user/create-popup/create-popup.component';
import { UpdatePopupComponent } from 'src/app/modules/user/update-popup/update-popup.component';

@Component({
    selector: 'app-user-listing',
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
    paginationData: PaginationResponse<UserResponse> =
        PaginationResponseBuilder({ Items: [] });

    constructor(
        private readonly router: Router,
        private readonly userApiService: UserApiService,
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
        this.userApiService
            .get$(page, take, search)
            .subscribe((data) => (this.paginationData = data));
    }

    onAddNewButtonClicked($event: any) {
        const ref = this.dialogService.open(CreatePopupComponent, {
            header: 'Add User',
            width: '70%',
            closable: true,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: UpsertUserDto) => {
                    const createUserReq = {
                        _id: req._id,
                        roles: req.roles,
                    } as UserRequest;
                    const changePasswordReq = {
                        _id: req._id,
                        newPassword: req.password,
                    } as UserPasswordRequest;

                    return this.userApiService
                        .upsert$(createUserReq)
                        .pipe(
                            mergeMap(() =>
                                this.userApiService.changePassword$(
                                    changePasswordReq
                                )
                            )
                        );
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Add user Successfully!',
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

    onRowEdit(item: UserResponse) {
        const upsertUserReq = {
            ...item,
        } as UpsertUserDto;
        const ref = this.dialogService.open(UpdatePopupComponent, {
            header: 'Update User',
            width: '70%',
            closable: true,
            data: upsertUserReq,
        });

        ref.onClose
            .pipe(
                filter((data) => !!data),
                mergeMap((req: UpsertUserDto) => {
                    const createUserReq = {
                        _id: req._id,
                        roles: req.roles,
                    } as UserRequest;
                    const changePasswordReq = {
                        _id: req._id,
                        newPassword: req.password,
                    } as UserPasswordRequest;

                    return this.userApiService.upsert$(createUserReq).pipe(
                        mergeMap(() => {
                            if (!changePasswordReq.newPassword) {
                                return of(true);
                            }
                            return this.userApiService.changePassword$(
                                changePasswordReq
                            );
                        })
                    );
                }),
                tap(() => {
                    this.fetchData();
                    this.messageService.add({
                        severity: ToastSeverities.Success,
                        summary: 'Add user Successfully!',
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
            message: 'Do you want to delete this permission',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.userApiService
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
