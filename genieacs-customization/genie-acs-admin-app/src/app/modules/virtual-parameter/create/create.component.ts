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
import { VirtualParameterRequest } from 'src/app/modules/@core/api-services/virtual-parameter/request-models/virtual-parameter.request';

@Component({
    selector: 'app-virtual-param-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
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
export class CreateComponent implements OnInit {
    public vParam: VirtualParameterRequest = {
        _id: '',
        script: '',
        parameterNames: [],
    };

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly virtualParameterApiService: VirtualParameterApiService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        const vParamId = this.route.snapshot.paramMap.get('id') || '';
    }

    onSaveBtnClicked($event: any) {
        this.vParam.parameterNames = ['a', 'b', 'c'];
        this.virtualParameterApiService
            .update$(this.vParam)
            .subscribe((result) => {
                this.messageService.add({
                    severity: ToastSeverities.Success,
                    summary: 'Save successfully!',
                });
                setTimeout(() => {
                    this.goBackToListingAfterCreation();
                }, 2000);
            });
    }

    private goBackToListingAfterCreation() {
        this.router.navigate(['/virtual-parameters']);
        return;
    }
}
