import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileApiService } from 'src/app/modules/@core/api-services/file/file.api-service';
import { FileResponse } from 'src/app/modules/@core/api-services/file/response-models/file.response';
import { ConfigService } from 'src/app/modules/@core/services/config.service';

@Component({
    selector: 'app-file-pushing-popup',
    templateUrl: './file-pushing-popup.component.html',
    styleUrls: ['./file-pushing-popup.component.scss'],
})
export class FilePushingPopupComponent implements OnInit {
    selectedFile: FileResponse = null as any;

    files: FileResponse[] = [];
    filteredFiles: FileResponse[] = [];

    constructor(
        private readonly fileApiService: FileApiService,
        private readonly dialogRef: DynamicDialogRef,
        private readonly configService: ConfigService
    ) {}
    ngOnInit(): void {
        this.fileApiService
            .get$(
                this.configService.paginationConfig.page,
                this.configService.paginationConfig.takeAll,
                ''
            )
            .subscribe((files) => {
                this.files = files.Items;
            });
    }

    onSaveBtnClicked(e: any) {
        e.preventDefault();
        if (!this.selectedFile) {
            return;
        }
        this.dialogRef.close(this.selectedFile);
    }

    onFileSearch(event: any) {
        const loweredCaseQuery = event.query.toLocaleLowerCase();
        this.filteredFiles = this.files.filter((f) =>
            f._id.toLocaleLowerCase().includes(loweredCaseQuery)
        );
    }

    onCancelBtnClicked(e: any) {
        e.preventDefault();
        this.dialogRef.close();
    }
}
