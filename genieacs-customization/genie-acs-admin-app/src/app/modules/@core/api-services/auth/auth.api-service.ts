import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from 'src/app/modules/@core/api-services/base.api-service';
import { AuthRequest } from 'src/app/modules/@core/api-services/auth/request-models/auth.request';
import { AuthResponse } from 'src/app/modules/@core/api-services/auth/response-models/auth.response';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    signIn$(authReq: AuthRequest): Observable<AuthResponse> {
        const params = this.gethHttpParamBuilder()
            .append('username', authReq.username)
            .append('password', authReq.password);

        return this.http.post(`${this.baseUrl}/login`, authReq).pipe(
            map((res: any) => {
                console.log(res);
                return {
                    jwt: res as string,
                };
            })
        );
    }

    signOut$(): Observable<any> {
        return this.http.post(`${this.baseUrl}/logout`, {});
    }
}
