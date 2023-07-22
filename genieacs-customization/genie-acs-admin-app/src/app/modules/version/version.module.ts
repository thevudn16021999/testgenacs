import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { ListingComponent } from 'src/app/modules/version/listing/listing.component';
import { UpsertPopupComponent } from 'src/app/modules/provision/upsert-popup/upsert-popup.component';

@NgModule({
    declarations: [ListingComponent, UpsertPopupComponent],
    providers: [DialogService, ConfirmationService],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListingComponent,
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
export class VersionModule {}
