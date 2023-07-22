import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { BaseConfigRequest } from 'src/app/modules/@core/api-services/config/request-models/config.request';
import { AdminConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/admin-config.response';
import { BaseConfigResponse } from 'src/app/modules/@core/api-services/config/response-models/config.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';

@Injectable({
    providedIn: 'root',
})
export class ConfigApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string = 'true'
    ): Observable<PaginationResponse<BaseConfigResponse>> {
        const skip = page * take;
        const params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter);

        return this.http
            .get<BaseConfigResponse[]>(`${this.baseUrl}/api/config`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as BaseConfigResponse[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<BaseConfigResponse>;
                })
            );
    }

    getAdminConfig$(): Observable<AdminConfigResponse> {
        const query = `_id = "admin-config"`;

        return this.http
            .get<AdminConfigResponse[]>(
                `${this.baseUrl}/api/config/?filter=${encodeURIComponent(
                    query
                )}`
            )
            .pipe(
                map((items) => {
                    const item = items.length > 0 ? items[0] : ({} as any);
                    if (!item._id) {
                        return null as any;
                    }
                    const adminConfig = item as AdminConfigResponse;
                    adminConfig.data = JSON.parse(adminConfig.value);
                    return adminConfig;
                })
            );
    }

    upsertConfig$(config: BaseConfigRequest): Observable<any> {
        return this.http.put<any>(
            `${this.baseUrl}/api/config/${config._id}`,
            config
        );
    }

    delete$(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/config/${id}`);
    }
}
