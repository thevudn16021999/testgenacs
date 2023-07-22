import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DetailComponent } from 'src/app/modules/admin-config/detail/detail.component';

@NgModule({
    declarations: [DetailComponent],
    providers: [ConfirmationService],
    imports: [
        RouterModule.forChild([
            {
                path: ':id',
                component: DetailComponent,
            },
            {
                path: '',
                component: DetailComponent,
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
    ],
})
export class AdminConfigModule {}
