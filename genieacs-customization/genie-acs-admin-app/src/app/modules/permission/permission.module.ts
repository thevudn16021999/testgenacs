import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ListingComponent } from 'src/app/modules/permission/listing/listing.component';
import { CreatePopupComponent } from 'src/app/modules/permission/create-popup/create-popup.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [ListingComponent, CreatePopupComponent],
    providers: [ConfirmationService, DialogService],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ListingComponent,
            },
        ]),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        SharedModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        TableModule,
        ConfirmDialogModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        FileUploadModule,
        DialogModule,
        DynamicDialogModule,
        DropdownModule,
        CheckboxModule,
    ],
})
export class PermissionModule {}
