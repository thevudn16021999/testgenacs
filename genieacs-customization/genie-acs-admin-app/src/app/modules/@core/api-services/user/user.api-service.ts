import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import {
    PaginationResponse,
    PaginationResponseBuilder,
} from 'src/app/modules/@core/api-services/share-models/pagination.response';
import {
    UserPasswordRequest,
    UserRequest,
} from 'src/app/modules/@core/api-services/user/request-models/user.request';
import { UserResponse } from 'src/app/modules/@core/api-services/user/response-models/user.response';

@Injectable({
    providedIn: 'root',
})
export class UserApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    get$(
        page: number,
        take: number,
        filter: string = 'true'
    ): Observable<PaginationResponse<UserResponse>> {
        const skip = page * take;
        const params = this.gethHttpParamBuilder()
            .append('limit', take)
            .append('skip', skip)
            .append('filter', filter);

        return this.http
            .get<UserResponse[]>(`${this.baseUrl}/api/users`, {
                params,
                observe: 'response',
            })
            .pipe(
                map((resp) => {
                    const items = resp.body as UserResponse[];
                    const total = +(
                        resp.headers.get('X-Total-Count') || items.length
                    );
                    return PaginationResponseBuilder({
                        Total: total,
                        Count: items.length,
                        Items: items,
                        Offset: skip,
                        Limit: take,
                    }) as PaginationResponse<UserResponse>;
                })
            );
    }

    getById$(id: string): Observable<UserResponse> {
        const query = `_id = "${id}"`;
        const params = this.gethHttpParamBuilder().append('filter', query);

        return this.http
            .get<UserResponse[]>(
                `${this.baseUrl}/api/users/?filter=${encodeURIComponent(query)}`
            )
            .pipe(
                map((items) => {
                    return items.length > 0 ? items[0] : (null as any);
                })
            );
    }

    upsert$(req: UserRequest): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/api/users/${req._id}`, {
            roles: req.roles,
        });
    }

    delete$(_id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/users/${_id}`);
    }

    changePassword$(req: UserPasswordRequest): Observable<any> {
        return this.http.put<any>(
            `${this.baseUrl}/api/users/${req._id}/password`,
            {
                newPassword: req.newPassword,
            }
        );
    }
}
