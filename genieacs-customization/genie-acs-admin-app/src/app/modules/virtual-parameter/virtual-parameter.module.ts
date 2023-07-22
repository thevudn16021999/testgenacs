import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListingComponent } from 'src/app/modules/virtual-parameter/listing/listing.component';
import { DetailComponent } from 'src/app/modules/virtual-parameter/detail/detail.component';
import { TableModule } from 'primeng/table';
import { CreateComponent } from 'src/app/modules/virtual-parameter/create/create.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [ListingComponent, DetailComponent, CreateComponent],
    providers: [ConfirmationService],
    imports: [
        RouterModule.forChild([
            {
                path: 'create',
                component: CreateComponent,
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
export class VirtualParameterModule {}
