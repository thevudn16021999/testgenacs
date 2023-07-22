import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { FileRequest } from 'src/app/modules/@core/api-services/file/request-models/file.request';
import { FileResponse } from 'src/app/modules/@core/api-services/file/response-models/file.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { SortByFieldRequest } from 'src/app/modules/@core/api-services/share-models/sort-by-field.request';

@Injectable({
    providedIn: 'root',
})
export class FileApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string,
        sorts: SortByFieldRequest[] = []
    ): Observable<PaginationResponse<FileResponse>> {
        const skip = page * take;
        let params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter || 'true');

        if (sorts && sorts.length) {
            const sort = sorts
                .map((s) => `"${s.fieldName}":${s.direction}`)
                .join(',');
            params = params.append('sort', `{${sort}}`);
        }

        return this.http
            .get<FileResponse[]>(`${this.baseUrl}/api/files`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as any[] as FileResponse[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: total,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<FileResponse>;
                })
            );
    }

    getFileDownloadLink(id: string) {
        return `${this.baseUrl}/api/blob/files/${id}`;
    }

    upsert$(req: FileRequest): Observable<any> {
        const headers = this.gethHttpHeaderBuilder()
            .set('metadata-fileType', req.fileType)
            .set('metadata-oui', req.oui)
            .set('metadata-productclass', req.productClass)
            .set('metadata-version', req.version);

        return this.http.put<any>(
            `${this.baseUrl}/api/files/${req.fileName}`,
            req.file,
            {
                headers,
            }
        );
    }

    delete$(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/files/${id}`);
    }
}
