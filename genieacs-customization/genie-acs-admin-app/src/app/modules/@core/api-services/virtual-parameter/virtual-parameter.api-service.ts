import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import { VirtualParameterRequest } from 'src/app/modules/@core/api-services/virtual-parameter/request-models/virtual-parameter.request';
import { VirtualParameterResponse } from 'src/app/modules/@core/api-services/virtual-parameter/response-models/virtual-parameter.response';

@Injectable({
    providedIn: 'root',
})
export class VirtualParameterApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string = 'true'
    ): Observable<PaginationResponse<VirtualParameterResponse>> {
        const skip = page * take;
        const params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter);

        return this.http
            .get<VirtualParameterResponse[]>(
                `${this.baseUrl}/api/virtualParameters`,
                {
                    params,
                    observe: 'response',
                }
            )
            .pipe(
                map((resp) => {
                    const items = resp.body as VirtualParameterResponse[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<VirtualParameterResponse>;
                })
            );
    }

    getById$(id: string): Observable<VirtualParameterResponse> {
        const query = `_id = "${id}"`;
        const params = this.gethHttpParamBuilder().append('filter', query);

        return this.http
            .get<VirtualParameterResponse[]>(
                `${
                    this.baseUrl
                }/api/virtualParameters/?filter=${encodeURIComponent(query)}`
            )
            .pipe(
                map((items) => {
                    return items.length > 0 ? items[0] : (null as any);
                })
            );
    }

    update$(vParam: VirtualParameterRequest): Observable<any> {
        return this.http.put<any>(
            `${this.baseUrl}/api/virtualParameters/${vParam._id}`,
            vParam
        );
    }

    delete$(vParamId: string): Observable<any> {
        return this.http.delete<any>(
            `${this.baseUrl}/api/virtualParameters/${vParamId}`
        );
    }
}
