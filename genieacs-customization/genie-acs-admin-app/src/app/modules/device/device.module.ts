import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/@shared/shared.module';
import { ListingComponent } from 'src/app/modules/device/listing/listing.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DetailComponent } from './detail/detail.component';
import { InputTextModule } from 'primeng/inputtext';
import { RawDetailComponent } from 'src/app/modules/device/raw-detail/raw-detail.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipsModule } from 'primeng/chips';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FilePushingPopupComponent } from 'src/app/modules/device/file-pushing-popup/file-pushing-popup.component';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        ListingComponent,
        DetailComponent,
        RawDetailComponent,
        FilePushingPopupComponent,
    ],
    providers: [DialogService, ConfirmationService],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':id/raw',
                component: RawDetailComponent,
            },
            {
                path: ':id',
                component: DetailComponent,
            },
            {
                path: '',
                component: ListingComponent,
            },
        ]),
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ToastModule,
        TableModule,
        DialogModule,
        DynamicDialogModule,
        SharedModule,
        ProgressSpinnerModule,
        ProgressBarModule,
        ChipsModule,
        ChipModule,
        TagModule,
        ConfirmDialogModule,
        AutoCompleteModule,
        DropdownModule,
        CheckboxModule,
        ChartModule,
        CalendarModule,
    ],
})
export class DeviceModule {}
