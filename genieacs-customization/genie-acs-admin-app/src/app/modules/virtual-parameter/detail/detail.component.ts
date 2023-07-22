import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ToastSeverities } from 'src/app/modules/@shared/enums/toast-severities.enum';
import { ProvisionResponse } from 'src/app/modules/@core/api-services/provision/response-models/provision.response';
import { ProvisionApiService } from 'src/app/modules/@core/api-services/provision/provision.api-service';
import { PaginationResponse } from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { VirtualParameterResponse } from 'src/app/modules/@core/api-services/virtual-parameter/response-models/virtual-parameter.response';
import { VirtualParameterApiService } from 'src/app/modules/@core/api-services/virtual-parameter/virtual-parameter.api-service';

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
    public vParam: VirtualParameterResponse = null as any;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly virtualParameterApiService: VirtualParameterApiService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        const vParamId = this.route.snapshot.paramMap.get('id') || '';
        this.fetch(vParamId);
    }

    onSaveBtnClicked($event: any) {
        console.log('onSummonBtnClicked');
        this.virtualParameterApiService
            .update$(this.vParam)
            .subscribe((result) => {
                this.messageService.add({
                    severity: ToastSeverities.Success,
                    summary: 'Save successfully!',
                });
            });
    }

    private fetch(id: string) {
        this.virtualParameterApiService
            .getById$(id)
            .subscribe((result: VirtualParameterResponse) => {
                if (!result) {
                    this.goBackToListingIfInvalidId('');
                    return;
                }
                this.vParam = result;
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
        this.router.navigate(['/virtual-parameters']);
        return;
    }
}
