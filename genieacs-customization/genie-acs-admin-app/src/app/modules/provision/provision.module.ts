import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DefaultComponent } from 'src/app/modules/provision/default/default.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ListingComponent } from 'src/app/modules/provision/listing/listing.component';
import { UpsertPopupComponent } from 'src/app/modules/version/upsert-popup/upsert-popup.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [ListingComponent, UpsertPopupComponent, DefaultComponent],
    providers: [DialogService, ConfirmationService],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListingComponent,
            },
            {
                path: 'default',
                component: DefaultComponent,
            },
        ]),
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        SharedModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        ConfirmDialogModule,
        TableModule,
    ],
})
export class ProvisionModule {}
