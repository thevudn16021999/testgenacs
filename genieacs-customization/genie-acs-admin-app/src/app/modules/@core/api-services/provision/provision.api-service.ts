import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { ProvisionRequest } from 'src/app/modules/@core/api-services/provision/request-models/provision.request';
import { ProvisionResponse } from 'src/app/modules/@core/api-services/provision/response-models/provision.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';

@Injectable({
    providedIn: 'root',
})
export class ProvisionApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string = ''
    ): Observable<PaginationResponse<ProvisionResponse>> {
        const skip = page * take;
        const params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter || 'true');

        return this.http
            .get<ProvisionResponse[]>(`${this.baseUrl}/api/provisions`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as ProvisionResponse[];
                    const total = +(resp.headers.get('total') || 0);
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<ProvisionResponse>;
                })
            );
    }

    getById$(id: string): Observable<ProvisionResponse> {
        const query = `_id = "${id}"`;
        const params = this.gethHttpParamBuilder().append('filter', query);

        return this.http
            .get<ProvisionResponse[]>(
                `${this.baseUrl}/api/provisions/?filter=${encodeURIComponent(
                    query
                )}`
            )
            .pipe(
                map((items) => {
                    return items.length > 0 ? items[0] : (null as any);
                })
            );
    }

    upsert$(provision: ProvisionRequest): Observable<any> {
        return this.http.put<any>(
            `${this.baseUrl}/api/provisions/${provision._id}`,
            provision
        );
    }

    delete$(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/provisions/${id}`);
    }
}
