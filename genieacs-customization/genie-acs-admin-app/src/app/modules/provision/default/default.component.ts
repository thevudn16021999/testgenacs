import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { ProvisionResponse } from 'src/app/modules/@core/api-services/provision/response-models/provision.response';
import { ProvisionApiService } from 'src/app/modules/@core/api-services/provision/provision.api-service';
import { PaginationResponse } from 'src/app/modules/@core/api-services/share-models/pagination.response';

@Component({
    selector: 'app-provision-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
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
export class DefaultComponent implements OnInit {
    public readonly provisionId: string = 'default';
    public provision: ProvisionResponse = null as any;

    constructor(
        private readonly router: Router,
        private readonly provisionApiService: ProvisionApiService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.fetch(this.provisionId);
    }

    onSaveBtnClicked($event: any) {
        console.log('onSummonBtnClicked');
        this.provisionApiService.upsert$(this.provision).subscribe((result) => {
            this.messageService.add({
                severity: ToastSeverities.Success,
                summary: 'Save successfully!',
            });
        });
    }

    private fetch(id: string) {
        this.provisionApiService
            .getById$(id)
            .subscribe((provision: ProvisionResponse) => {
                if (!provision) {
                    this.goBackToListingIfInvalidId('');
                    return;
                }
                this.provision = provision;
            });
    }

    private goBackToListingIfInvalidId(id: string) {
        if (id) {
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
