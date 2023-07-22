import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { PermissionRequest } from 'src/app/modules/@core/api-services/permission/request-models/permission.request';
import { PermissionResponse } from 'src/app/modules/@core/api-services/permission/response-models/permission.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { SortByFieldRequest } from 'src/app/modules/@core/api-services/share-models/sort-by-field.request';

@Injectable({
    providedIn: 'root',
})
export class PermissionApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string = 'true',
        sorts: SortByFieldRequest[] = []
    ): Observable<PaginationResponse<PermissionResponse>> {
        const skip = page * take;
        let params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter);

        if (sorts && sorts.length) {
            const sort = sorts
                .map((s) => `"${s.fieldName}":${s.direction}`)
                .join(',');
            params = params.append('sort', `{${sort}}`);
        }

        return this.http
            .get<PermissionResponse[]>(`${this.baseUrl}/api/permissions`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as PermissionResponse[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<PermissionResponse>;
                })
            );
    }

    getRoleNames$(): Observable<string[]> {
        const params = this.gethHttpParamBuilder()
            .append('limit', 1000)
            .append('skip', 0)
            .append('filter', 'true');

        return this.http
            .get<PermissionResponse[]>(`${this.baseUrl}/api/permissions`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as PermissionResponse[];
                    const roleNames = [...new Set(items.map((i) => i.role))];
                    return roleNames;
                })
            );
    }

    upsert$(req: PermissionRequest): Observable<any> {
        const _id = encodeURIComponent(
            [req.role, req.resource, req.access].join(':')
        );
        return this.http.put<any>(
            `${this.baseUrl}/api/permissions/${_id}`,
            req
        );
    }

    delete$(req: PermissionRequest): Observable<any> {
        const _id = encodeURIComponent(
            [req.role, req.resource, req.access].join(':')
        );
        return this.http.delete<any>(`${this.baseUrl}/api/permissions/${_id}`);
    }
}
