import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { UpsertPresetRequest } from 'src/app/modules/@core/api-services/preset/request-models/preset.request';
import { PresetResponse } from 'src/app/modules/@core/api-services/preset/response-models/preset.response';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';

@Injectable({
    providedIn: 'root',
})
export class PresetApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string = 'true'
    ): Observable<PaginationResponse<PresetResponse>> {
        const skip = page * take;
        const params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter);

        return this.http
            .get<PresetResponse[]>(`${this.baseUrl}/api/presets`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as PresetResponse[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<PresetResponse>;
                })
            );
    }

    upsert$(req: UpsertPresetRequest): Observable<any> {
        return this.http.put<any>(
            `${this.baseUrl}/api/presets/${req._id}`,
            req
        );
    }

    delete$(_id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/presets/${_id}`);
    }
}
