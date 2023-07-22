import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { DeviceLog } from 'src/app/modules/@core/api-services/device-log/response-models/device-log.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';

@Injectable({
    providedIn: 'root',
})
export class DeviceLogApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        from: Date,
        to: Date,
        page: number = 1,
        take: number = 10
    ): Observable<PaginationResponse<DeviceLog>> {
        const skip = page * take;
        const params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append(
                'filter',
                `Created = "${from.getTime()};;;${to.getTime()}"`
            );

        return this.http
            .get<DeviceLog[]>(`${this.baseUrl}/api/devicelogs`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as DeviceLog[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<DeviceLog>;
                })
            );
    }
}
